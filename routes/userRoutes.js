import express from 'express';

const router = express.Router();

// Reusable middleware function for handling errors
const handleErrors = (res, err) => {
  console.log(err);
  res.status(500).json(err);
};

// GET USER BY ID
router.get('/:id', async (req, res) => {
  try {
    
  }
  catch (err) {
    handleErrors(res, err);
  }
});

// UPDATE USER
router.put('/:id', async (req, res) => {
  try {

  }
  catch (err) {
    handleErrors(res, err);
  }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
  try {
    
  }
  catch (err) {
    handleErrors(res, err);
  }
});

export default router;