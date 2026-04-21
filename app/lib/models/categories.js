import {Schema } from "mongoose"
import mongoose from "mongoose"

const Category = new Schema({
    name: String,
    slug: String,
    image: String,
    description: String,
}, {timestamps: true})

export default mongoose.models.Category || mongoose.model("Category", Category);