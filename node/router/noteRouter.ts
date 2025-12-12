import express from "express"
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
  forceDeleteNote,
  getAllDeletedNotes,
} from "../controller/NoteController"

const noteRouter = express.Router()

noteRouter.route("/notes").get(getAllNotes)
noteRouter.route("/notes/deleted").get(getAllDeletedNotes)

noteRouter.route("/note/").post(createNote)

noteRouter
  .route("/note/:id")
  .get(getNoteById)
  .delete(deleteNote)
  .put(updateNote)

noteRouter.route("/note/:id/force").delete(forceDeleteNote)

export default noteRouter
