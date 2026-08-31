import { NEXT_PUBLIC_API_URL } from "@/config/variables";

export type UploadedMediaAsset = {
  url: string;
  publicId: string;
};

type MediaUploadResponse = {
  success?: boolean;
  url?: string;
  data?: {
    url?: string;
    secure_url?: string;
    publicId?: string;
    objectKey?: string;
  };
  message?: string;
};

export const uploadImageToMedia = async (
  file: File,
  folder = "ophmate/reviews",
): Promise<UploadedMediaAsset> => uploadFileToMedia(file, folder);

export const uploadFileToMedia = async (
  file: File,
  folder = "ophmate/uploads",
): Promise<UploadedMediaAsset> => {
  if (!NEXT_PUBLIC_API_URL) {
    throw new Error("API URL is not configured");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const resourceType = file.type.startsWith("image/")
    ? "image"
    : file.type.startsWith("video/")
      ? "video"
      : "raw";
  formData.append("resourceType", resourceType);

  const uploadRes = await fetch(`${NEXT_PUBLIC_API_URL}/public/media/upload`, {
    method: "POST",
    body: formData,
  });

  if (!uploadRes.ok) {
    const payload = (await uploadRes.json().catch(() => null)) as MediaUploadResponse | null;
    throw new Error(payload?.message || "File upload failed");
  }

  const uploadData = (await uploadRes.json()) as MediaUploadResponse;
  const url = String(
    uploadData.url || uploadData.data?.secure_url || uploadData.data?.url || "",
  );
  const publicId = String(uploadData.data?.publicId || uploadData.data?.objectKey || "");

  if (!url) {
    throw new Error("Upload succeeded but no URL was returned");
  }

  return { url, publicId };
};

/** @deprecated Use uploadFileToMedia — storage is Cloudflare R2. */
export const uploadFileToCloudinary = uploadFileToMedia;

/** @deprecated Use uploadImageToMedia — storage is Cloudflare R2. */
export const uploadImageToCloudinary = uploadImageToMedia;

export type UploadedCloudinaryImage = UploadedMediaAsset;
