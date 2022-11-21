import mongoose from "mongoose";
const bcrypt = require("bcrypt");

/* Schema for user creating  */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

export default mongoose.models.User || mongoose.model("User", UserSchema, "users")