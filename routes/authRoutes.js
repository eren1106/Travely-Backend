import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import mailSend from '../models/mail.js';
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
    if(!user){
      return res.status(404).json("user not found");
    }
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
router.post('/reset', async (req, res) => {
  try {
    console.log("call /reset POST data=> email:" + req.body.email + " newPassword:" + req.body.newPassword);
    // find user with unique email
    const user = await User.findOne({ email: req.body.email });
    if(!user){
      return res.status(404).json("user not found");
    }

    // validate verification code
    const code = req.body.code
    //check code in database
    if (user.code !== null) {
      // database has code
      console.log(user.code);
      // compare verification code with user input
      if (!(user.code === code)) {  //incorrect
        return res.status(500).json('Verification code incorrect!');
      }
      else { 
        // code is correct, then reset password
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
        user.password = hashedPassword
        //save user and respond
        const newUser = await user.save();
        res.status(200).json(user)
      }
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// 发送邮箱验证码
router.post('/sendEmail', async (req, res) => {

  try {
    // find user with unique email
    const userEmail = req.body.email;
    //const newPassword = req.body.newPassword;

    const user = await User.findOne({ email: userEmail });
    if(!user){
      return res.status(404).json("user not found");
    }

    // validate by sending email
    if (userEmail) {

      // 生成验证码时将验证码存入数据库中
      let code = parseInt( Math.random() * 10000 ) // 随机验证码
      user.code = code;
      await user.save();
      // 发送验证码
      mailSend(userEmail, code).then(() => {
        res.send({err: 0, msg: 'Send verification email successfully!'})
      }).catch((err) => {
        console.log(err)
        res.send({err: -1, msg: 'Send verification email failed!'})
      })
    
    }
    
  }catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

export default router;