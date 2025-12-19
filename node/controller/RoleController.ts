import { eq, getTableColumns } from "drizzle-orm"
import type { Request, Response } from "express"
import pgdb from "../db/postgres/config"
import Role from "../db/postgres/schema/RoleSchema"

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await pgdb
      .select()
      .from(Role)
      .where(eq(Role.isDeleted, false))

    return res.success("🔍 Roles fetched", {
      length: roles.length,
      roles: roles,
    })
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to fetch role", 500, error)
  }
}

export const getAllDeletedRoles = async (req: Request, res: Response) => {
  try {
    const roles = await pgdb.select().from(Role).where(eq(Role.isDeleted, true))

    return res.success("🔍 Roles fetched", {
      length: roles.length,
      roles: roles,
    })
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to fetch role", 500, error)
  }
}

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const { name } = req.params
    const role = await pgdb.select().from(Role).where(eq(Role.name, name))

    return res.success("🔍 Role fetched", role)
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to fetch role", 500, error)
  }
}

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const role = await pgdb
      .insert(Role)
      .values({ name })
      .returning(getTableColumns(Role))

    return res.success("🌟 Role created", role, 201)
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to create role", 500, error)
  }
}

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { name: oldName } = req.params
    const { name } = req.body
    const updates: { name?: string } = {}

    if (name) updates.name = name

    const role = await pgdb
      .update(Role)
      .set(updates)
      .where(eq(Role.name, oldName))
      .returning(getTableColumns(Role))

    return res.success("♻️ Role updated", role, 200)
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to update role", 500, error)
  }
}

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.params
    const role = await pgdb
      .update(Role)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(eq(Role.name, name))
      .returning(getTableColumns(Role))

    return res.success("🗑 Role deleted", role, 200)
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to deleted role", 500, error)
  }
}

export const forceDeleteRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.params
    const role = await pgdb
      .delete(Role)
      .where(eq(Role.name, name))
      .returning(getTableColumns(Role))

    return res.success("🗑 Role deleted", role, 200)
  } catch (error) {
    // if (error instanceof mongoose.Error.ValidationError) {
    //   return res.error("❌ Validation failed", 400, error.errors)
    // }

    return res.error("❌ Failed to deleted role", 500, error)
  }
}
