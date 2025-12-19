import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

const Role = pgTable("roles", {
  name: varchar({ length: 100 }).notNull().unique().primaryKey(),

  isDeleted: boolean().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export default Role
