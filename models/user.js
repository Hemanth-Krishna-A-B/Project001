import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    class_name: { type: String, required: true },
});

// Fix: Use `mongoose.models.User` instead of `models.User`
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
