const mongoose = require("mongoose");
const passport = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    image: String,
    posts: [ { type: mongoose.Schema.Types.ObjectId, ref: "Post" } ]
});

UserSchema.plugin(passport);

module.exports = mongoose.model("User", UserSchema);