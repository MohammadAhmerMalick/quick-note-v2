import "express"
import type { UserType } from "../db/postgres/schema/UserSchema"

declare module "express-serve-static-core" {
  interface Request {
    user: UserType
  }
  interface Response {
    success(message?: string, data?: any, status?: number): this
    error(message?: string, status?: number, data?: any): this
  }
}
