import mongoose from "mongoose"
import type { Request, Response } from "express"
import Note from "../../db/mongo/schema/NoteSchema"

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ isDeleted: false })

    return res.success("🔍 Notes fetched", {
      length: notes.length,
      notes: notes,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.error("❌ Validation failed", 400, error.errors)
    }

    return res.error("❌ Failed to fetch note", 500, error)
  }
}

export const getAllDeletedNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ isDeleted: true })

    return res.success("🔍 Notes fetched", {
      length: notes.length,
      notes: notes,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.error("❌ Validation failed", 400, error.errors)
    }

    return res.error("❌ Failed to fetch note", 500, error)
  }
}

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const note = await Note.findById(id)

    return res.success("🔍 Note fetched", note)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.error("❌ Validation failed", 400, error.errors)
    }

    return res.error("❌ Failed to fetch note", 500, error)
  }
}

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, description, files, userId } = req.body

    const note = new Note({ title, description, files, userId })
    await note.save()

    return res.success("🌟 Note created", note, 201)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.error("❌ Validation failed", 400, error.errors)
    }

    return res.error("❌ Failed to create note", 500, error)
  }
}

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, files } = req.body
    const updates: { title?: string; description?: string; files?: any[] } = {}

    if (title) updates.title = title
    if (description) updates.description = description
    if (files) updates.files = files

    const note = await Note.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    )

    return res.success("♻️ Note updated", note, 200)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.error("❌ Validation failed", 400, error.errors)
    }

    return res.error("❌ Failed to update note", 500, error)
  }
}

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const note = await Note.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    )

    return res.success("🗑 Note deleted", note, 200)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.error("❌ Validation failed", 400, error.errors)
    }

    return res.error("❌ Failed to deleted note", 500, error)
  }
}

export const forceDeleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const note = await Note.findByIdAndDelete(id, { new: true })

    return res.success("🗑 Note deleted", note, 200)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.error("❌ Validation failed", 400, error.errors)
    }

    return res.error("❌ Failed to deleted note", 500, error)
  }
}
