import { eq, getTableColumns } from "drizzle-orm"
import type { Request, Response } from "express"
import pgdb from "../db/postgres/config"
import User from "../db/postgres/schema/UserSchema"

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await pgdb
      .select()
      .from(User)
      .where(eq(User.isDeleted, false))

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

export const getAllDeletedUsers = async (req: Request, res: Response) => {
  try {
    const users = await pgdb.select().from(User).where(eq(User.isDeleted, true))

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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await pgdb.select().from(User).where(eq(User.id, id))

    return res.success("🔍 User fetched", user)
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to fetch user", 500, error)
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, role, email, password } = req.body

    const user = await pgdb
      .insert(User)
      .values({ name, email, role, password })
      .returning(getTableColumns(User))

    return res.success("🌟 User created", user, 201)
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to create user", 500, error)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, email, password } = req.body
    const updates: { name?: string; email?: string; password?: string } = {}

    if (name) updates.name = name
    if (email) updates.email = email
    if (password) updates.password = password

    const user = await pgdb
      .update(User)
      .set(updates)
      .where(eq(User.id, id))
      .returning(getTableColumns(User))

    return res.success("♻️ User updated", user, 200)
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to update user", 500, error)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await pgdb
      .update(User)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(eq(User.id, id))
      .returning(getTableColumns(User))

    return res.success("🗑 User deleted", user, 200)
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to deleted user", 500, error)
  }
}

export const forceDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await pgdb
      .delete(User)
      .where(eq(User.id, id))
      .returning(getTableColumns(User))

    return res.success("🗑 User deleted", user, 200)
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to deleted user", 500, error)
  }
}
