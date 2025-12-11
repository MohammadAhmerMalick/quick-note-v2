import express from "express"
import noteRouter from "./router/noteRouter"

const app = express()
app.use(express.json())
const PORT = process.env.NODE_PORT || 8000

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use(noteRouter)

app.listen(PORT, () => {
  console.log({ node: `http://localhost:${PORT}` })
})
