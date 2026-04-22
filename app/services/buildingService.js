import ConnectDB from "@/app/lib/db";
import Building from "@/app/lib/models/buildings";
import { AppError } from "@/app/lib/errors";
import { uploadImg, deleteImage } from "@/app/lib/cloud";
import Likes from "@/app/lib/models/likes";
import Comments from "@/app/lib/models/comments";
import User from "@/app/lib/models/user";
import crypto from "crypto";

const CommentReal = Comments;

/**
 * Service to handle building logic with 1:1 parity with original API routes.
 */
export const buildingService = {
  /**
   * Fetches recent buildings (1:1 with /api/buildings/recent).
   */
  async getRecentBuildings(limit = 10) {
    await ConnectDB();
    const buildings = await Building.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return JSON.parse(JSON.stringify(buildings));
  },
  async getMostLikedBuildings(limit = 10) {
    await ConnectDB();
    const buildings = await Building.find()
      .sort({ likesCount: -1 })
      .limit(limit)
      .lean();
    return JSON.parse(JSON.stringify(buildings));
  },
  async getMostViewedBuildings(limit = 10) {
    await ConnectDB();
    const buildings = await Building.find()
      .sort({ views: -1 })
      .limit(limit)
      .lean();
    return JSON.parse(JSON.stringify(buildings));
  },
  /**
   * Fetches building by ID (1:1 with /api/buildings/[id]).
   */
  async getBuildingByCategoryName(name) {
    await ConnectDB();
    const buildings = await Building.find({ type: name }).lean();
    return JSON.parse(JSON.stringify(buildings));
  },
  async getBuildingById(id) {
    await ConnectDB();
    const building = await Building.findById(id)
      .populate({ path: "commentsReal", strictPopulate: false })
      .lean();
    if (!building) {
      throw new AppError("Building not found", 404);
    }
    return JSON.parse(
      JSON.stringify({ ...building, _id: building._id.toString() }),
    );
  },

  /**
   * Searches buildings (1:1 with /api/buildings/search).
   */
  async searchBuildings(filters) {
    await ConnectDB();

    const { city, state, minPrice, maxPrice, type } = filters;
    const query = {};

    if (city) query.city = { $regex: city, $options: "i" };
    if (state) query.state = { $regex: state, $options: "i" };
    if (maxPrice || minPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (type) query.type = type;

    const buildings = await Building.find(query).lean();
    return JSON.parse(JSON.stringify(buildings));
  },

  /**
   * Adds a new building with parallel uploads and structured UUID/Order.
   */
  async addBuilding(data) {
    await ConnectDB();

    const {
      title,
      description,
      price,
      address,
      city,
      state,
      imageFiles,
      type,
      isActive,
      bedrooms,
      bathrooms,
      area,
    } = data;

    // 1. Parallel Upload
    const uploadPromises = (imageFiles || []).map(async (file, index) => {
      if (
        file instanceof File ||
        (file && typeof file === "object" && file.size)
      ) {
        const uploaded = await uploadImg(file);
        return {
          id: crypto.randomUUID(),
          url: uploaded.url,
          public_id: uploaded.public_id,
          order: index,
        };
      }
      return null;
    });

    const images = (await Promise.all(uploadPromises)).filter(
      (img) => img !== null,
    );

    const newBuilding = new Building({
      title,
      description,
      price,
      address,
      city,
      state,
      images,
      type,
      isActive: isActive === "true" || isActive === true,
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      area: Number(area) || 0,
    });

    await newBuilding.save();
    return JSON.parse(JSON.stringify({ success: true, building: newBuilding }));
  },

  /**
   * Updates an existing building with Advanced Parallel Smart Diffing.
   * imageFiles expected as: [ { id: "old1", order: 0 }, { file: File, tempId: "t1", order: 1 } ]
   */
  async updateBuilding(id, data) {
    await ConnectDB();

    const buildingOld = await Building.findById(id);
    if (!buildingOld) {
      throw new AppError("Building not found", 404);
    }

    const {
      title,
      description,
      price,
      address,
      city,
      state,
      imageFiles,
      type,
      isActive,
      bedrooms,
      bathrooms,
      area,
    } = data;

    // 1. Split (New Files vs Metadata)
    const newFileTasks = imageFiles.filter((item) => item.file); // new files
    const existingEntries = imageFiles.filter((item) => item.id && !item.file); // remaining images

    // 2. Parallel Upload New Files
    const uploadResultsMap = new Map();
    await Promise.all(
      newFileTasks.map(async (task) => {
        const uploaded = await uploadImg(task.file);
        uploadResultsMap.set(task.tempId, {
          id: crypto.randomUUID(),
          url: uploaded.url,
          public_id: uploaded.public_id,
        });
      }),
    );

    // 3. Build Map of Existing Data (id -> obj)
    const oldDataMap = new Map();
    buildingOld.images.forEach((img) => oldDataMap.set(img.id, img));

    // 4. Construct Final Images (Ordered)
    const finalImages = imageFiles
      .map((item) => {
        if (item.id && oldDataMap.has(item.id)) {
          // Existing image
          const old = oldDataMap.get(item.id);
          return {
            ...(old.toObject ? old.toObject() : old),
            order: item.order,
          };
        } else if (item.tempId && uploadResultsMap.has(item.tempId)) {
          // Newly uploaded image
          const uploaded = uploadResultsMap.get(item.tempId);
          return { ...uploaded, order: item.order };
        }
        return null;
      })
      .filter(Boolean);

    // 5. Compute Deletions (Parallel)
    const keptIds = new Set(existingEntries.map((e) => e.id));
    const toDelete = buildingOld.images.filter((img) => !keptIds.has(img.id));

    // 6. Delete from Cloudinary (Parallel)
    await Promise.all(
      toDelete.map((img) =>
        img.public_id ? deleteImage(img.public_id) : Promise.resolve(),
      ),
    );

    // 7. Update DB
    const updatedBuilding = await Building.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        address,
        city,
        state,
        images: finalImages,
        type,
        isActive: isActive === "true" || isActive === true,
        bedrooms: Number(bedrooms) || 0,
        bathrooms: Number(bathrooms) || 0,
        area: Number(area) || 0,
      },
      { new: true },
    );

    return JSON.parse(
      JSON.stringify({ success: true, building: updatedBuilding }),
    );
  },

  /**
   * Deletes a building and its dependencies (Parallel Asset Cleanup).
   */
  async deleteBuilding(id) {
    await ConnectDB();

    const building = await Building.findById(id);
    if (!building) {
      throw new AppError("Building not found", 404);
    }

    // Parallel logic
    const cleanupTasks = [
      // Fix: schema field is 'building', not 'buildingId'
      Likes.deleteMany({ building: id }),
      CommentReal.deleteMany({ building: id }),
      ...(building.images || []).map((img) =>
        img.public_id ? deleteImage(img.public_id) : Promise.resolve(),
      ),
    ];

    await Promise.all(cleanupTasks);
    await building.deleteOne();

    return { success: true, message: "Building deleted successfully" };
  },

  /**
   * Fetches dashboard buildings (1:1 with /api/dashboard/buildings GET).
   */
  async getDashboardBuildings(limit = 10) {
    await ConnectDB();
    const buildings = await Building.find().limit(limit).lean();
    return JSON.parse(JSON.stringify(buildings));
  },
  async getAllBuildings() {
    await ConnectDB();
    const buildings = await Building.find().lean();
    return JSON.parse(JSON.stringify(buildings));
  },
  async getBuildingComments(id) {
    await ConnectDB();
    const comments = await CommentReal.find({ building: id })
      .populate("user", "name")
      .lean();
    return JSON.parse(JSON.stringify(comments));
  },
  async isLiked(id,userId) {
    await ConnectDB();
    const liked = await Likes.findOne({ building: id , user: userId});
    return liked?true:false;
  },
};
