import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    commentText:{
        type: String,
        required: true,
    }
}, { timestamps: true, versionKey: false });

export default mongoose.model("Comment", CommentSchema);