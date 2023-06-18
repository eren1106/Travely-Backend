import mongoose from "mongoose";

const PostViewSchema = new mongoose.Schema({
    postID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required:true,
    },
    date : {
        type: String,
        required: true,
    }
}, { timestamps: false, versionKey: false });

export default mongoose.model("View", PostViewSchema);