import { Schema } from "mongoose";
import mongoose from "mongoose";
const Comment = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "UserReal",
    required: true,
  },
  building: { type: Schema.Types.ObjectId, ref: "Building", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CommentReal ||
  mongoose.model("CommentReal", Comment);
