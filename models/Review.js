import mongoose from "npm:mongoose";

const ReviewSchema = new mongoose.Schema({
    content: String,
    rating: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Review", ReviewSchema);