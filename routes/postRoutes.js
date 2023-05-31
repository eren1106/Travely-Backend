import express from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Rating from "../models/Rating.js";
const router = express.Router();

// Reusable middleware function for handling errors
const handleErrors = (res, err) => {
  console.log(err);
  res.status(500).json(err);
};

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    handleErrors(res, err);
  }
});

// GET POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    handleErrors(res, err);
  }
});

//CREATE POST
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (err) {
    handleErrors(res, err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    handleErrors(res, err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedPost);
  } catch (err) {
    handleErrors(res, err);
  }
});

// GET ALL COMMENTS BY POST ID
router.get("/:id/comments", async (req, res) => {
  try {
    const comment = await Comment.find({ postID: req.params.id });
    res.status(200).json(comment);
  } catch (err) {
    handleErrors(res, err);
  }
});

// CREATE COMMENT
router.post("/:id/comments", async (req, res) => {
  try {
    const newComment = new Comment({
      postID: req.params.id,
      userID: req.body.userID,
      commentText: req.body.commentText,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (err) {
    handleErrors(res, err);
  }
});

// CREATE RATING
router.post("/:id/rating/:userID", async (req, res) => {
  try {
    const rating = new Rating({
      postID: req.params.id,
      userID: req.params.userID,
      rating: req.body.rating,
    });
    await rating.save();
    res.status(200).json(rating);
  } catch (err) {
    handleErrors(res, err);
  }
});

// UPDATE RATING
router.put("/:id/rating/:userID", async (req, res) => {
  try {
    const rating = await Rating.findOneAndUpdate(
      { postID: req.params.id, userID: req.params.userID },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(rating);
  } catch (err) {
    handleErrors(res, err);
  }
});

// DELETE RATING
router.delete("/:id/rating/:userID", async (req, res) => {
  try {
    const deletedRating = await Rating.findOneAndDelete({
      postID: req.params.id,
      userID: req.params.userID,
    });
    res.status(200).json(deletedRating);
  } catch (err) {
    handleErrors(res, err);
  }
});

// GET RATING BY POST ID
router.get("/:id/rating", async (req,res) =>{
  try {
    const rating = await Rating.find({postID : req.params.id})
    res.status(200).json(rating);
  } catch(err) {
    handleErrors(res,err);
  }
})
export default router;
