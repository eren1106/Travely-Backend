import express from 'express';
import User from '../models/User.js'
import bcrypt from 'bcrypt'
const router = express.Router();



// REGISTER
router.post('/register', async (req, res) => {
  try {

    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json("Email already exists");
    }
    
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(req.body)
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
    console.log(err);
    res.status(500).json(err);
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

    if(!validPassword){
      res.status(400).json("wrong password")
    }else{
      res.status(200).json(user)
    }
    

  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// RESET PASSWORD
router.post('/resetPassword', async (req, res) => {
  try {

    // find user with unique email
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    // validate by sending email

    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    user.password = hashedPassword
    //save user and respond
    const newUser = await user.save();
    res.status(200).json(user)

  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;