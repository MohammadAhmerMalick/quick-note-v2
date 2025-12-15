import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"

if (!process.env.POSTGRES_URI)
  throw new Error("❌ POSTGRES_URI is not defined in environment variables")

const client = new Pool({ connectionString: process.env.POSTGRES_URI })
const pgdb = drizzle(client)

console.log("✅ PostgreSQL connected successfully")

export default pgdb
