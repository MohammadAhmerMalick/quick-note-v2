import express from "express"
import auth from "./middleware/auth"
import authRouter from "./router/authRouter"
import connectMongo from "./db/mongo/config"
import noteRouter from "./router/noteRouter"
import userRouter from "./router/userRouter"
import roleRouter from "./router/roleRouter"
import responseStatusHandler from "./middleware/responseStatusHandler"

// database
import "./db/postgres/config"
import seed from "./db/postgres/seed"
await connectMongo()

seed.init() // seed admin user and role in postgres

const PORT = process.env.NODE_PORT || 8000

const app = express()
app.use(express.json())
app.use(responseStatusHandler)

app.get("/", (req, res) => {
  res.send("Hello World")
})

// api routes
app.use("/api/auth", authRouter)

app.use(auth)
app.use("/api", noteRouter)
app.use("/api", roleRouter)
app.use("/api", userRouter)

// server
app.listen(PORT, () => {
  console.log({ node: `http://localhost:${PORT}` })
})
