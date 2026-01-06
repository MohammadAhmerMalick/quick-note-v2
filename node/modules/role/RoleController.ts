import type { Request, Response } from "express"
import roleModel from "./RoleModel"

class RoleController {
  private roleModel: typeof roleModel

  constructor() {
    this.roleModel = roleModel
  }

  getAllRoles = async (req: Request, res: Response) => {
    try {
      const roles = await this.roleModel.getAllRoles()
      const roleCount = roles.length

      return res.success("🔍 Roles fetched", { length: roleCount, roles })
    } catch (error) {
      return res.error("❌ Failed to fetch role", 500, error)
    }
  }

  getAllDeletedRoles = async (req: Request, res: Response) => {
    try {
      const roles = await this.roleModel.getAllDeletedRoles()
      const roleCount = roles.length

      return res.success("🔍 Roles fetched", { length: roleCount, roles })
    } catch (error) {
      return res.error("❌ Failed to fetch role", 500, error)
    }
  }

  getRoleByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.params
      const role = await this.roleModel.getRoleByName(name)

      return role.length
        ? res.success("🔍 Role fetched", role)
        : res.error("📧❌ Role not found", 404)
    } catch (error) {
      return res.error("❌ Failed to fetch role", 500, error)
    }
  }

  createRole = async (req: Request, res: Response) => {
    try {
      const { name } = req.body
      const existingRole = await this.roleModel.getRoleByName(name)
      if (existingRole.length) return res.error("📧❌ Role already exists", 409)

      const role = await this.roleModel.createRole({ name })
      return res.success("🌟 Role created", role, 201)
    } catch (error) {
      return res.error("❌ Failed to create role", 500, error)
    }
  }

  updateRole = async (req: Request, res: Response) => {
    try {
      const { name: oldName } = req.params
      const existingRole = await this.roleModel.getRoleByName(oldName)
      if (!existingRole.length) return res.error("📧❌ Role not found", 404)

      const { name } = req.body
      const updates: { name: string } = { name: name || oldName }

      const role = await this.roleModel.updateRole(oldName, updates)

      return res.success("♻️ Role updated", role, 200)
    } catch (error) {
      return res.error("❌ Failed to update role", 500, error)
    }
  }

  deleteRole = async (req: Request, res: Response) => {
    try {
      const { name } = req.params
      const existingRole = await this.roleModel.getRoleByName(name)
      if (!existingRole.length) return res.error("📧❌ Role not found", 404)

      const role = await this.roleModel.deleteRole(name)

      return res.success("🗑 Role deleted", role, 200)
    } catch (error) {
      return res.error("❌ Failed to deleted role", 500, error)
    }
  }

  forceDeleteRole = async (req: Request, res: Response) => {
    try {
      const { name } = req.params
      const existingRole = await this.roleModel.getRoleByName(name)
      if (!existingRole.length) return res.error("📧❌ Role not found", 404)

      const role = await this.roleModel.forceDeleteRole(name)

      return res.success("🗑 Role deleted", role, 200)
    } catch (error) {
      return res.error("❌ Failed to deleted role", 500, error)
    }
  }
}

const roleController = new RoleController()

export default roleController
