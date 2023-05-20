import express from 'express';

const router = express.Router();

// GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET POST BY ID
router.get('/:id', async (req, res) => {
  try {
    
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put('/:id', async (req, res) => {
  try {
    
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;