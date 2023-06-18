import mongoose from "mongoose";

const ProfileViewSchema = new mongoose.Schema({
    userID: {
        type: String,
        required:true,
    },
    date : {
        type: String,
        required: true,
    }
}, { timestamps: false, versionKey: false });

export default mongoose.model("ProfileView", ProfileViewSchema);