import express from "express"

const noteRouter = express.Router()

noteRouter.route("/notes").get((req, res) => {
  return res.json({ message: "Get all notes" })
})

noteRouter
  .route("/note/:id")
  .get((req, res) => {
    const { id } = req.params
    return res.json({ message: "get a single note " + id })
  })
  .delete((req, res) => {
    const { id } = req.params
    return res.json({ message: "delete a single note " + id })
  })
  .put((req, res) => {
    return res.json({ message: "put a single note" })
  })

noteRouter.route("/note/").post((req, res) => {
  const data = req.body
  console.log({ data })
  return res.json({ message: "post a single note" })
})

export default noteRouter
