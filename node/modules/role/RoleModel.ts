import { eq, getTableColumns } from "drizzle-orm"
import pgdb from "../../db/postgres/config"
import Role, { type RoleType } from "../../db/postgres/schema/RoleSchema"

class RoleModel {
  getAllRoles = async () =>
    pgdb.select().from(Role).where(eq(Role.isDeleted, false))

  getAllDeletedRoles = async () =>
    pgdb.select().from(Role).where(eq(Role.isDeleted, true))

  getRoleById = async (name: string) =>
    pgdb.select().from(Role).where(eq(Role.name, name))

  createRole = async (role: RoleType) =>
    pgdb.insert(Role).values(role).returning(getTableColumns(Role))

  updateRole = async (name: string, updates: RoleType) =>
    pgdb
      .update(Role)
      .set({ ...updates, deletedAt: new Date() })
      .where(eq(Role.name, name))
      .returning(getTableColumns(Role))

  deleteRole = async (name: string) =>
    pgdb
      .update(Role)
      .set({ isDeleted: true, deletedAt: new Date() })
      .where(eq(Role.name, name))
      .returning(getTableColumns(Role))

  forceDeleteRole = async (name: string) =>
    pgdb
      .delete(Role)
      .where(eq(Role.name, name))
      .returning(getTableColumns(Role))
}

const roleModel = new RoleModel()

export default roleModel
