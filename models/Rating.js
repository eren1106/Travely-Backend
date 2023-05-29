import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    postID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
        min:1,
        max:5
    }
}, { timestamps: true, versionKey: false });

export default mongoose.model("Rating", RatingSchema);