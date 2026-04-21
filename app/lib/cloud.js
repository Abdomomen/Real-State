import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})



/**
 * Uploads a File object (from FormData) to Cloudinary.
 * @param {File} file - The file to upload
 * @param {string} folder - The folder in Cloudinary to upload to
 * @returns {Promise<{url: string, public_id: string}>}
 */

export async function uploadImg(file, folder="real-state") {
    const arrayBuffer= await file.arrayBuffer()
    const buffer= Buffer.from(arrayBuffer)

    return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    uploadStream.end(buffer);
  });
}


/**
 * Deletes an image from Cloudinary by its public_id.
 * @param {string} publicId
 */
export async function deleteImage(publicId) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err);
  }
}
