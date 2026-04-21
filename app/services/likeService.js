import ConnectDB from "@/app/lib/db";
import Building from "@/app/lib/models/buildings";
import Like from "@/app/lib/models/likes";
import { AppError } from "@/app/lib/errors";

/**
 * Service to handle liking logic with 1:1 parity with original API routes.
 */
export const likeService = {
    /**
     * Toggles a user's like on a building.
     */
    async toggleLike(buildingId, userId) {
        await ConnectDB();

        if (!buildingId) {
            throw new AppError("Building ID is required", 400);
        }

        const building = await Building.findById(buildingId);
        if (!building) {
            throw new AppError("Building not found", 404);
        }

        const existingLike = await Like.findOne({ user: userId, building: buildingId });

        if (existingLike) {
            // Unlike logic
            await Like.findByIdAndDelete(existingLike._id);
            building.likesCount = Math.max(0, building.likesCount - 1);
            await building.save();
            return JSON.parse(JSON.stringify({ success: true, liked: false, likesCount: building.likesCount }));
        } else {
            // Like logic
            const newLike = new Like({ user: userId, building: buildingId });
            await newLike.save();
            building.likesCount += 1;
            await building.save();
            return JSON.parse(JSON.stringify({ success: true, liked: true, likesCount: building.likesCount }));
        }
    }
};
