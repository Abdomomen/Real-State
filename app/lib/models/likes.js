import { Schema } from "mongoose";
import mongoose from "mongoose";
const Like = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "UserReal",
  },
  building: {
    type: Schema.Types.ObjectId,
    ref: "Building",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Like || mongoose.model("Like", Like);
