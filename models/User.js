import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
      },
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    gender: {
        type: String,
        required: true,
      },
    profilePicture: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      max: 100,
    },
    dateOfBirth: {
      type: Date,
    },
    dateJoin: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);