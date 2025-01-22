import mongoose from "npm:mongoose";
import mongoosePaginate from "npm:mongoose-paginate-v2";

import Review from "#/models/Review.js";

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

PostSchema.plugin(mongoosePaginate);

export default mongoose.model("Post", PostSchema);