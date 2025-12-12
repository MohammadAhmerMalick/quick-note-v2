import express from "express"
import connectMongo from "./db/mongo/config"
import noteRouter from "./router/noteRouter"
import responseStatusHandler from "./middleware/responseStatusHandler"

await connectMongo()

const app = express()
app.use(express.json())
app.use(responseStatusHandler)

const PORT = process.env.NODE_PORT || 8000

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use(noteRouter)

app.listen(PORT, () => {
  console.log({ node: `http://localhost:${PORT}` })
})
