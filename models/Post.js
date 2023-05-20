import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  postID: {
    type: String,
    required: true,
    unique: true,
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
  rating: {
    type: [Number],
    default: [],
  },
  numOfVisitors: {
    type: Number,
    default: 0,
  },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Post", PostSchema);