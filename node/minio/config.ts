import { Client } from "minio"

export const minioClient = new Client({
  endPoint: process.env.MINIO_END_POINT || "localhost",
  port: Number(process.env.MINIO_API_PORT) || 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER || "minioadmin",
  secretKey: process.env.MINIO_ROOT_PASSWORD || "minioadmin",
})
