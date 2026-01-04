import mongoose from "mongoose"

const fileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
  },
  { timestamps: true }
)

const NoteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    files: { type: [fileSchema], default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Note = mongoose.model("Note", NoteSchema)

export default Note
