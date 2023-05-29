import express from 'express';

const router = express.Router();
//const User = require("../models/User");
//const bcrypt = require("bcrypt");

// Reusable middleware function for handling errors
const handleErrors = (res, err) => {
  console.log(err);
  res.status(500).json(err);
};

// REGISTER
router.post('/register', async (req, res) => {
  try {

    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);

  }
  catch (err) {
    handleErrors(res, err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {

    // find user with unique email
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    // validate password by comparing with the actual password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)

  }
  catch (err) {
    handleErrors(res, err);
  }
});

export default router;