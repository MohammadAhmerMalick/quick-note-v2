import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express"
import auth from "./middlewares/authMiddleware"
import authRouter from "./router/authRouter"
import connectMongo from "./db/mongo/config"
import noteRouter from "./router/noteRouter"
import userRouter from "./router/userRouter"
import roleRouter from "./router/roleRouter"
import responseStatusHandler from "./middlewares/responseStatusHandler"

// database
import "./db/postgres/config"
await connectMongo()

const PORT = process.env.NODE_PORT || 8000

const app = express()
app.use(express.json()) // To parse JSON bodies
app.use("/uploads", express.static("uploads"))
app.use(responseStatusHandler)

app.get("/", (req, res) => {
  res.send("Hello World")
})

// Global error handler (important for Multer)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(400).json({ message: err.message })
})

// api routes
app.use("/api/auth", authRouter)
app.use(auth)
app.use("/api", noteRouter)
app.use("/api", roleRouter)
app.use("/api", userRouter)

// server
app.listen(PORT, () => {
  console.info({ node: `http://localhost:${PORT}` })
})
