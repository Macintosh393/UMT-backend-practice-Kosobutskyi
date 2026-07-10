import path from "path";

import cloudinary from "../config/cloudinary.js";
import config from "../envConfigs.js";

function buildPublicId(originalname) {
  const baseName = path.parse(originalname).name;

  return `${Date.now()}-${baseName}`;
}

function getMimeType(file) {
  if (file.mimetype && file.mimetype !== "application/octet-stream") {
    return file.mimetype;
  }

  const extension = path.extname(file.originalname).toLowerCase();
  const mimeTypes = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };

  return mimeTypes[extension] ?? "image/jpeg";
}

function getPublicIdFromUrl(imageUrl) {
  if (!imageUrl?.includes("res.cloudinary.com")) {
    return null;
  }

  const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);

  return match?.[1] ?? null;
}

export async function uploadImageToCloudinary(file) {
  const publicId = buildPublicId(file.originalname);

  const dataUri = `data:${getMimeType(file)};base64,${file.buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: config.cloudinary.folder,
    public_id: publicId,
    overwrite: false,
    resource_type: "image",
  });

  return result.secure_url;
}

export async function deleteImageFromCloudinary(imageUrl) {
  const publicId = getPublicIdFromUrl(imageUrl);

  if (!publicId) {
    return;
  }

  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}
