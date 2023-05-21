import express from 'express';

const router = express.Router();

// Reusable middleware function for handling errors
const handleErrors = (res, err) => {
  console.log(err);
  res.status(500).json(err);
};

// REGISTER
router.post('/register', async (req, res) => {
  try {
    
  }
  catch (err) {
    handleErrors(res, err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {

  }
  catch (err) {
    handleErrors(res, err);
  }
});

export default router;