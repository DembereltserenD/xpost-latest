// lib/minio.ts
import * as Minio from "minio";

export const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "minioadmin",
  secretKey: "minioadmin",
});

export const BUCKET_NAME = "settings";

export async function uploadFile(file: any, fileName: string) {
  try {
    const bucketExists = await minioClient.bucketExists(BUCKET_NAME);
    if (!bucketExists) {
      await minioClient.makeBucket(BUCKET_NAME);
    }

    await minioClient.putObject(BUCKET_NAME, fileName, file);
    return `${BUCKET_NAME}/${fileName}`;
  } catch (error) {
    console.error("MinIO upload error:", error);
    throw error;
  }
}
