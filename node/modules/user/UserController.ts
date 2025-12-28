import bcrypt from "bcrypt"
import type { Request, Response } from "express"
import userModel from "./UserModel"
import jwt from "../../helper/jtw"

class UserController {
  signin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const users = await userModel.getUserByEmail(email)

      if (!users.length) return res.error("👔❌ User not found", 404)

      const { password: userPassword, ...user } = users[0]

      const isPasswordValid = await bcrypt.compare(password, userPassword)
      if (!isPasswordValid) return res.error("🗝️❌ Invalid password", 401)

      const token = jwt.sign({ data: { user: { id: user.id } } })

      return res.success("🚪✅ User signed in successfully", { user, token })
    } catch (error) {
      console.log({ error })

      return res.error("🚪❌ Failed to signin user", 500, error)
    }
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await userModel.getAllUsers()

      return res.success("👔🔍 Users fetched", {
        length: users.length,
        users: users,
      })
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, errors,error)
      // }

      return res.error("❌ Failed to fetch user", 500, error)
    }
  }

  getAllDeletedUsers = async (req: Request, res: Response) => {
    try {
      const users = await userModel.getAllDeletedUsers()

      return res.success("🔍 Users fetched", {
        length: users.length,
        users: users,
      })
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, errors,error)
      // }

      return res.error("❌ Failed to fetch user", 500, error)
    }
  }

  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const user = await userModel.getUserById(id)

      return res.success("🔍 User fetched", user)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, errors,error)
      // }

      return res.error("❌ Failed to fetch user", 500, error)
    }
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const { name, role, email, password } = req.body

      const existingUsers = await userModel.getUserByEmail(email)
      if (existingUsers.length)
        return res.error("📧❌ Email already in use", 409)
      if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined")

      const userData = await userModel.createUser({
        name,
        role,
        email,
        password,
      })
      const { password: userPassword, ...user } = userData[0]

      const token = jwt.sign({ data: { user: { id: user.id } } })

      return res.success("🌟 User created", { user, token }, 201)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, errors,error)
      // }
      return res.error("❌ Failed to create user", 500, error)
    }
  }

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { name, email, password, role } = req.body
      const updates: {
        name?: string
        role?: string
        email?: string
        password?: string
      } = {}

      if (name) updates.name = name
      if (role) updates.role = role
      if (email) updates.email = email
      if (password) updates.password = password

      const userData = await userModel.updateUser(id, {
        name,
        email,
        password,
        role,
      })

      const { password: userPassword, ...user } = userData[0]

      return res.success("♻️ User updated", user, 200)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, errors,error)
      // }

      return res.error("❌ Failed to update user", 500, error)
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const user = await userModel.deleteUser(id)

      return res.success("🗑 User deleted", user, 200)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, errors,error)
      // }

      return res.error("❌ Failed to deleted user", 500, error)
    }
  }

  forceDeleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const user = await userModel.forceDeleteUser(id)

      return res.success("🗑 User deleted", user, 200)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, errors,error)
      // }

      return res.error("❌ Failed to deleted user", 500, error)
    }
  }
}

const userController = new UserController()

export default userController
