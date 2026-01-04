import mongoose from "mongoose"
import type { Request, Response } from "express"
import Note from "../../db/mongo/schema/NoteSchema"
import minioService, { type MinioService } from "../../services/minioService"

class NoteController {
  constructor(public minio: MinioService = minioService) {}

  responseIfMongoValidationError = (res: Response, error: unknown) => {
    if (error instanceof mongoose.Error.ValidationError)
      return res.error("❌ Validation failed", 400, error.errors)
  }

  getAllNotes = async (req: Request, res: Response) => {
    try {
      // get notes from the database where isDeleted is false
      const notes = await Note.find({ isDeleted: false })
      const noteCount = notes.length
      return res.success("🔍 Notes fetched", { length: noteCount, notes })
    } catch (error) {
      return res.error("❌ Failed to fetch note", 500, error)
    }
  }

  getAllDeletedNotes = async (req: Request, res: Response) => {
    try {
      // get notes from the database where isDeleted is true
      const notes = await Note.find({ isDeleted: true })
      const noteCount = notes.length
      return res.success("🔍 Notes fetched", { length: noteCount, notes })
    } catch (error) {
      return res.error("❌ Failed to fetch note", 500, error)
    }
  }

  getNoteById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      // get note from the database by id
      const note = await Note.findById(id)
      return res.success("🔍 Note fetched", note)
    } catch (error) {
      return res.error("❌ Failed to fetch note", 500, error)
    }
  }

  createNote = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id // get user id from the request token
      const { title, description } = req.body

      const files = req.files as Express.Multer.File[]

      // ⬇️ Upload all files to MinIO in parallel
      const uploadedFiles = await Promise.all(
        files.map((file) => this.minio.uploadFile(file))
      )

      // create a new note in the database
      const note = new Note({
        title,
        userId,
        description,
        files: uploadedFiles,
      })
      await note.save()

      return res.success("🌟 Note created", note, 201)
    } catch (error) {
      this.responseIfMongoValidationError(res, error)
      return res.error("❌ Failed to create note", 500, error)
    }
  }

  updateNote = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const noteToBeUpdated = await Note.findById(id)
      if (!noteToBeUpdated) return res.error("❌ Note not found", 404)

      const { title, description } = req.body
      const files = req.files as Express.Multer.File[]

      const updates: { title?: string; description?: string; files?: any[] } =
        {}

      // ⬇️ Upload all files to MinIO in parallel
      const uploadedFiles = await Promise.all(
        files.map((file) => this.minio.uploadFile(file))
      )

      if (title) updates.title = title
      if (description) updates.description = description
      if (files) updates.files = [...noteToBeUpdated.files, ...uploadedFiles]

      const note = await Note.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true }
      )

      return res.success("♻️ Note updated", note, 200)
    } catch (error) {
      this.responseIfMongoValidationError(res, error)

      return res.error("❌ Failed to update note", 500, error)
    }
  }

  deleteNote = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const noteToBeDeleted = await Note.findById(id)
      if (!noteToBeDeleted) return res.error("❌ Note not found", 404)

      const note = await Note.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      )

      return res.success("🗑 Note deleted", note, 200)
    } catch (error) {
      this.responseIfMongoValidationError(res, error)

      return res.error("❌ Failed to deleted note", 500, error)
    }
  }

  forceDeleteNote = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const noteToBeDeleted = await Note.findById(id)
      if (!noteToBeDeleted) return res.error("❌ Note not found", 404)

      // ⬇️ Delete all files from MinIO in parallel
      await Promise.all(
        noteToBeDeleted.files.map((file) => this.minio.deleteFile(file.name))
      )

      const note = await Note.findByIdAndDelete(id, { new: true })

      return res.success("🗑 Note deleted", note, 200)
    } catch (error) {
      this.responseIfMongoValidationError(res, error)

      return res.error("❌ Failed to deleted note", 500, error)
    }
  }
}

const noteController = new NoteController()

export default noteController
