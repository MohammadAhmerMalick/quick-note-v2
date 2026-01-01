import multer, {
  type Multer,
  type StorageEngine,
  type FileFilterCallback,
} from "multer"
import fs from "fs"
import { Request } from "express"

interface MulterOptions {
  uploadPath?: string
  allowedMimeTypes?: string[]
  maxFileSize?: number
}

export class MulterMiddleware {
  private uploadPath: string
  private allowedMimeTypes: string[]
  private maxFileSize: number
  private storage: StorageEngine
  private upload: Multer

  constructor(options: MulterOptions = {}) {
    this.uploadPath = options.uploadPath ?? "uploads"
    this.allowedMimeTypes = options.allowedMimeTypes ?? [
      "image/jpeg",
      "image/png",
      "image/webp",
    ]
    this.maxFileSize = options.maxFileSize ?? 5 * 1024 * 1024 // 5MB

    this.ensureUploadDir()

    this.storage = this.createStorage()
    this.upload = multer({
      storage: this.storage,
      // fileFilter: this.fileFilter.bind(this),
      limits: { fileSize: this.maxFileSize },
    })
  }

  private ensureUploadDir(): void {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true })
    }
  }

  private createStorage(): StorageEngine {
    return multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, this.uploadPath)
      },
      filename: (_req, file, cb) => {
        const uniqueName = `${crypto.randomUUID()}-${file.originalname}`
        cb(null, uniqueName)
      },
    })
  }

  private fileFilter(
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ): void {
    if (this.allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(
        new Error(
          `Invalid file type. Allowed: ${this.allowedMimeTypes.join(", ")}`
        )
      )
    }
  }

  single(fieldName: string = "files") {
    return this.upload.single(fieldName)
  }

  multiple(fieldName: string = "files", maxCount = 10) {
    return this.upload.array(fieldName, maxCount)
  }

  fields(fields: { name: string; maxCount?: number }[]) {
    return this.upload.fields(fields)
  }
}
