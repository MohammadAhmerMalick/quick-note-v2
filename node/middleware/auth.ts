import type { JwtPayload } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"
import jwt from "../helper/jtw"
import userModel from "../modules/user/UserModel"

class AuthMiddleware {
  private extractBearerToekn = (req: Request) => {
    const bearer = req.get("authorization")
    if (!bearer?.startsWith("Bearer ") || !bearer?.split(" ")[1])
      throw Error("🛡️❌ Invalid token provided")

    const token = bearer.split(" ")[1]

    return token
  }

  private getUserDataByToken = async (token: string) => {
    const decoded = jwt.verify(token) as JwtPayload

    if (!decoded?.data?.userId) throw Error("🛡️❌ User missing in token")

    const [user] = await userModel.getUserById(decoded.data.userId)
    return user
  }

  auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = this.extractBearerToekn(req)
      console.log("4")
      req.user = await this.getUserDataByToken(token)
      console.log("5")
    } catch (error) {
      console.log({ error })
      return res.error("🛡️❌ No token provided", 401, error)
    }

    next()
  }
}

const authMiddleware = new AuthMiddleware()

export default authMiddleware.auth
