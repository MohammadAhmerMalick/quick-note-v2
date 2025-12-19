import { varchar, pgTable, uuid, boolean, timestamp } from "drizzle-orm/pg-core"
import Role from "./RoleSchema"

const User = pgTable("users", {
  id: uuid().unique().notNull().primaryKey().defaultRandom(),

  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }),
  approved: boolean().default(false),

  role: varchar({ length: 100 })
    .notNull()
    .references(() => Role.name, {
      onDelete: "cascade",
    }),

  isDeleted: boolean().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export type UserType = typeof User.$inferInsert

export default User
