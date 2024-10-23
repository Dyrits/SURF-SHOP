import mongoose from "npm:mongoose";
import passport from "npm:passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    email: String,
    image: String
});

UserSchema.plugin(passport);

export default mongoose.model("User", UserSchema);