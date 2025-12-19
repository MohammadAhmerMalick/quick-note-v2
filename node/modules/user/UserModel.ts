import { eq, getTableColumns } from "drizzle-orm"
import pgdb from "../../db/postgres/config"
import User, { type UserType } from "../../db/postgres/schema/UserSchema"

class UserModel {
  getAllUsers = async () =>
    pgdb.select().from(User).where(eq(User.isDeleted, false))

  getAllDeletedUsers = async () =>
    pgdb.select().from(User).where(eq(User.isDeleted, true))

  getUserById = async (id: string) =>
    pgdb.select().from(User).where(eq(User.id, id))

  createUser = async (user: UserType) =>
    pgdb.insert(User).values(user).returning(getTableColumns(User))

  updateUser = async (id: string, updates: UserType) =>
    pgdb
      .update(User)
      .set(updates)
      .where(eq(User.id, id))
      .returning(getTableColumns(User))

  deleteUser = async (id: string) =>
    pgdb
      .update(User)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(eq(User.id, id))
      .returning(getTableColumns(User))

  forceDeleteUser = async (id: string) =>
    pgdb.delete(User).where(eq(User.id, id)).returning(getTableColumns(User))
}

const userModel = new UserModel()

export default userModel
