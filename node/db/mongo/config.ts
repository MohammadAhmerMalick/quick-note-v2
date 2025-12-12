import mongoose from "mongoose"

const connectMongo = async () => {
  try {
    if (!process.env.MONGO_URI)
      throw new Error("❌ MONGO_URI is not defined in environment variables")

    await mongoose.connect(process.env.MONGO_URI)
    console.log("✅ MongoDB connected successfully")
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      console.error("❌ MongoDB connection error:", error.message)
    else console.error("❌ MongoDB error:", error)

    process.exit(1)
  }
}

export default connectMongo
