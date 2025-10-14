import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    passwordHash: String,
    emailConfirmed: Boolean
});

export const UserModel = mongoose.models.user
    || mongoose.model("user", UserSchema);