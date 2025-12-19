import type { Request, Response } from "express"
import roleModel from "./RoleModel"

class RoleController {
  getAllRoles = async (req: Request, res: Response) => {
    try {
      const roles = await roleModel.getAllRoles()

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

  getAllDeletedRoles = async (req: Request, res: Response) => {
    try {
      const roles = await roleModel.getAllDeletedRoles()

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

  getRoleById = async (req: Request, res: Response) => {
    try {
      const { name } = req.params
      const role = await roleModel.getRoleById(name)

      return res.success("🔍 Role fetched", role)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, error.errors)
      // }

      return res.error("❌ Failed to fetch role", 500, error)
    }
  }

  createRole = async (req: Request, res: Response) => {
    try {
      const { name } = req.body

      const role = await roleModel.createRole({ name })

      return res.success("🌟 Role created", role, 201)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, error.errors)
      // }

      return res.error("❌ Failed to create role", 500, error)
    }
  }

  updateRole = async (req: Request, res: Response) => {
    try {
      const { name: oldName } = req.params
      const { name } = req.body
      const updates: { name: string } = { name: name || oldName }

      const role = await roleModel.updateRole(oldName, updates)

      return res.success("♻️ Role updated", role, 200)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, error.errors)
      // }

      return res.error("❌ Failed to update role", 500, error)
    }
  }

  deleteRole = async (req: Request, res: Response) => {
    try {
      const { name } = req.params
      const role = await roleModel.deleteRole(name)

      return res.success("🗑 Role deleted", role, 200)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, error.errors)
      // }

      return res.error("❌ Failed to deleted role", 500, error)
    }
  }

  forceDeleteRole = async (req: Request, res: Response) => {
    try {
      const { name } = req.params
      const role = await roleModel.forceDeleteRole(name)

      return res.success("🗑 Role deleted", role, 200)
    } catch (error) {
      // if (error instanceof mongoose.Error.ValidationError) {
      //   return res.error("❌ Validation failed", 400, error.errors)
      // }

      return res.error("❌ Failed to deleted role", 500, error)
    }
  }
}

const roleController = new RoleController()

export default roleController
