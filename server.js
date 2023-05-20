import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes.js';

const app = express();
const port = 3000;

dotenv.config();

// MIDDLEWARE
app.use(express.json());

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ROUTES
app.use('/api/posts', postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
