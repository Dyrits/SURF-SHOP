const mongoose = require("mongoose");

const Review = require("./Review");

const PostSchema = new mongoose.Schema({
    title: String,
    price: String,
    description: String,
    images: [{ url: String, id: String}],
    location: String,
    coordinates: [Number],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviews : [ { type: mongoose.Schema.Types.ObjectId, ref: "Review" } ]
});

PostSchema.pre("remove", async function() {
    await Review.remove({
        _id: {
            $in: this.reviews
        }
    });
});

module.exports = mongoose.model("Post", PostSchema);