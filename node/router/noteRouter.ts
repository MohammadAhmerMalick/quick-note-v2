import express from "express"
import noteController from "../modules/note/NoteController"
import { MulterMiddleware } from "../middlewares/multerMiddleware"

const {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
  forceDeleteNote,
  getAllDeletedNotes,
} = noteController

const multerInstance = new MulterMiddleware({
  uploadPath: "uploads",
  maxFileSize: 2 * 1024 * 1024, // 2MB
})

const noteRouter = express.Router()

noteRouter.route("/notes").get(getAllNotes)
noteRouter.route("/notes/deleted").get(getAllDeletedNotes)

noteRouter.route("/note/").post(multerInstance.multiple(), createNote)

noteRouter
  .route("/note/:id")
  .get(getNoteById)
  .delete(deleteNote)
  .put(multerInstance.multiple(), updateNote)

noteRouter.route("/note/:id/force").delete(forceDeleteNote)

export default noteRouter
