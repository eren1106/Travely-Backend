import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Reusable middleware function for handling errors
const handleErrors = (res, err) => {
  console.log(err);
  res.status(500).json(err);
};

// GET USER BY ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  }
  catch (err) {
    handleErrors(res, err);
  }
});

// UPDATE USER
router.put('/:id', async (req, res) => {
  const{id} = req.params;
  const{username, bio} = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, bio },
      { new: true }
    );
    res.status(200).json(updatedUser);
  }

  catch (err) {
    handleErrors(res, err);
  }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    handleErrors(res, err);
  }
});

export default router;