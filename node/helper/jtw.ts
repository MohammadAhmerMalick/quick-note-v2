import jw from "jsonwebtoken"
import type { SignOptions } from "jsonwebtoken"

interface SignPayload {
  data: { user: { id: string } }
}

class JWT {
  secret: string
  expiresIn: SignOptions["expiresIn"]

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw Error("🌬️❌ JWT_SECRET is not defined in environment variables")
    }

    this.expiresIn = "30d"
    this.secret = process.env.JWT_SECRET
  }

  // create token
  sign = (payload: SignPayload) =>
    jw.sign(payload, this.secret, { expiresIn: this.expiresIn })

  // verify token
  verify = (token: string) => jw.verify(token, this.secret)
}

const jwt = new JWT()

export default jwt
