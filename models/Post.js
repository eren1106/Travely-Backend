import mongoose from "mongoose";
import Comment from "../models/Comment.js"
const PostSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "At least one image is required.",
    },
  },
  numOfVisitors: {
    type: Number,
    default: 0,
  },

  comments: {
    type: [Comment.Schema],
    default:[]
  }
}, { timestamps: true, versionKey: false });

export default mongoose.model("Post", PostSchema);