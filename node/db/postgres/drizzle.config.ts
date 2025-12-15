import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./drizzle",
  schema: "./db/postgres/schema/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URI!,
  },
})
