import "express"

declare module "express-serve-static-core" {
  interface Response {
    success(message?: string, data?: any, status?: number): this
    error(message?: string, status?: number, data?: any): this
  }
}
