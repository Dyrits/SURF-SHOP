const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    content: String,
    rating: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Review", ReviewSchema);