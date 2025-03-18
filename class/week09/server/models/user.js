import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            require: true,
        },
        // role: {
        //     type: String,
        //     enum: ["user", "admin"]
        // }
    }
)

const User = mongoose.model("users", userSchema) // mongoose will turn "User" --> "users" BE CAREFUL

export default User