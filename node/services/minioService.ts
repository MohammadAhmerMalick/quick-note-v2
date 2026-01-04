import { minioClient } from "../minio/config"

export class MinioService {
  private bucketName: string

  constructor(bucketName: string) {
    this.bucketName = bucketName
  }

  async ensureBucket(): Promise<void> {
    const exists = await minioClient.bucketExists(this.bucketName)
    if (!exists) {
      await minioClient.makeBucket(this.bucketName, "us-east-1")
      this.makeBucketPublicReadPolicy()
    }
  }

  makeBucketPublicReadPolicy = async () => {
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { AWS: "*" },
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${this.bucketName}/*`],
        },
      ],
    }

    await minioClient.setBucketPolicy(this.bucketName, JSON.stringify(policy))
  }

  deleteFile = (fileName: string) => {
    minioClient.removeObject(this.bucketName, fileName)
  }

  uploadFile = async (
    file: Express.Multer.File
  ): Promise<{ name: string; path: string; type: string; size: string }> => {
    await this.ensureBucket()
    const name = file.filename
    const path = file.path
    const size = file.size.toString()
    const type = file.mimetype

    await minioClient.fPutObject(this.bucketName, name, path)

    return {
      name,
      path: `${this.bucketName}/${name}`,
      size,
      type,
    }
  }
}

const minioService = new MinioService("quick-note-bucket")

export default minioService
