import express from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Rating from "../models/Rating.js";
import User from '../models/User.js';
import mongoose from 'mongoose'
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
    const postsWithUserDetails = await Promise.all(
      posts.map(async (post) => {
        
        const user = await User.findById( post.userID );
        console.log(post.userID);

        // Calculate average rating
        const ratings = await Rating.find({ postID: post._id });
        let averageRating = 0;
        if (ratings.length === 0){
          averageRating = 0;
        }else {
          const sumOfRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
          averageRating = (sumOfRatings / ratings.length).toFixed(1);
        }
        
        // Format date
        const dateFormat = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true
        };
        const convertDateTimeFormat = (dates) =>{
          const formatedDate =  dates.toLocaleString("en-US", dateFormat);
          return formatedDate
        }

        const postWithUserDetail = {
          postID: post._id,
          userID: post.userID,
          username: user.username,
          profilePicture: user.profilePicture,
          description: post.description,
          location: post.location,
          images: post.images[0],
          numOfVisitors: post.numOfVisitors,
          rating: averageRating,
          createdAt: convertDateTimeFormat(post.createdAt),
        };

        return postWithUserDetail;
      })
    );
    res.status(200).json(postsWithUserDetails);
  } catch (err) {
    handleErrors(res, err);
  }
});

// GET POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    }
    else {
      res.status(404).json("Post not found");
    }
  } catch (err) {
    handleErrors(res, err);
  }
});

// GET POSTS BY ID
router.get("/user/:id", async (req, res) => {
  try {
    const posts = await Post.find({ userID: req.params.id });
    const postsWithUserDetails = await Promise.all(
      posts.map(async (post) => {
        // Find user details
        const userId = new mongoose.Types.ObjectId(post.userID); // Convert string to ObjectId
        const user = await User.findOne({ _id: userId });

        // Calculate average rating
        const ratings = await Rating.find({ postID: post._id });
        let averageRating = 0;
        if (ratings.length === 0) {
          averageRating = 0;
        } else {
          const sumOfRatings = ratings.reduce(
            (sum, rating) => sum + rating.rating,
            0
          );
          averageRating = (sumOfRatings / ratings.length).toFixed(1);
        }

        // Format date
        const dateFormat = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };
        const convertDateTimeFormat = (dates) => {
          const formatedDate = dates.toLocaleString("en-US", dateFormat);
          return formatedDate;
        };

        const postWithUserDetail = {
          postID: post._id,
          userID: post.userID,
          username: user.username,
          profilePicture: user.profilePicture,
          description: post.description,
          location: post.location,
          images: post.images[0],
          numOfVisitors: post.numOfVisitors,
          rating: averageRating,
          createdAt: convertDateTimeFormat(post.createdAt),
        };

        return postWithUserDetail;
      })
    );
    if (posts) {
      res.status(200).json(postsWithUserDetails);
    } else {
      res.status(404).json("Post not found");
    }
  } catch (err) {
    handleErrors(res, err);
  }
});

//CREATE POST
router.post("/", async (req, res) => {
  try {
    const newPost = new Post({
      userID: req.body.userID,
      description:req.body.description,
      location:req.body.location,
      images:req.body.images,
    });
    await newPost.save()
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
    const comments = await Comment.find({ postID: req.params.id });
    const commentsWithUserDetails = await Promise.all(
      comments.map(async (comment) => {
        const user = await User.findById(comment.userID);
        const commentWithUserDetail = {
          postID: comment.postID,
          userID: comment.userID,
          commentText: comment.commentText,
          createdAt: comment.createdAt,
          username: user.username,
          profilePicture: user.profilePicture,
        }
        return commentWithUserDetail;
      })
    );
    res.status(200).json(commentsWithUserDetails);
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

// GET ALL RATING BY POST ID
router.get("/:id/rating", async (req, res) => {
  try {
    const ratings = await Rating.find({ postID: req.params.id });
    // Calculate and return average rating
    const sumOfRatings = ratings.reduce((sum, rating) => sum + rating.rating,0);
    const averageRating = (sumOfRatings / ratings.length).toFixed(1)
    res.status(200).json(averageRating);
  } catch (err) {
    handleErrors(res, err);
  }

})

// GET RATING BY POST ID AND USER ID
router.get("/:id/rating/:userID", async (req, res) => {
  const { id, userID } = req.params;
  try {
    const rating = await Rating.findOne({
      postID: id,
      userID: userID,
    });

    res.status(200).json(rating);
  } catch (err) {
    handleErrors(res, err);
  }
})

// UPSERT (update / insert) RATING
router.put("/:id/rating/:userID", async (req, res) => {
  try {
    const existingRating = await Rating.findOne({
      postID: req.params.id,
      userID: req.params.userID,
    });

    let rating;

    if (existingRating) {
      rating = await Rating.findOneAndUpdate(
        { postID: req.params.id, userID: req.params.userID },
        { $set: req.body },
        { new: true }
      );
    }
    else {
      rating = await Rating.create({
        postID: req.params.id,
        userID: req.params.userID,
        rating: req.body.rating,
      })
    }

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

export default router;
