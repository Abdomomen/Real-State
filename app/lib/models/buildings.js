import { Schema } from "mongoose";
import mongoose from "mongoose";

const Building = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        id: { type: String, required: true },
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        order: { type: Number, default: 0 },
      },
    ],
    commentsReal: [
      {
        type: Schema.Types.ObjectId,
        ref: "CommentReal",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    bedrooms: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      default: 0,
    },
    area: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ["house", "apartment", "office", "shop", "land"],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true, strictPopulate: false },
);

export default mongoose.models.Building || mongoose.model("Building", Building);
