import type { Request, Response } from "express"
import userModel from "./UserModel"

class UserController {
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await userModel.getAllUsers()

      return res.success("🔍 Users fetched", {
        length: users.length,
        users: users,
      })
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, error.errors)
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
      //   return res.error("❌ Validation failed", 400, error.errors)
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
      //   return res.error("❌ Validation failed", 400, error.errors)
      // }

      return res.error("❌ Failed to fetch user", 500, error)
    }
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const { name, role, email, password } = req.body

      const user = await userModel.createUser({ name, role, email, password })

      return res.success("🌟 User created", user, 201)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, error.errors)
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

      const user = await userModel.updateUser(id, {
        name,
        email,
        password,
        role,
      })

      return res.success("♻️ User updated", user, 200)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, error.errors)
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
      //   return res.error("❌ Validation failed", 400, error.errors)
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
      //   return res.error("❌ Validation failed", 400, error.errors)
      // }

      return res.error("❌ Failed to deleted user", 500, error)
    }
  }
}

const userController = new UserController()

export default userController
