// GUIDE TO USE THIS APP
// run 'npm install' at terminal to install all packages (first time only)
// run 'npm run dev' at terminal to start the app

import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

const app = express();
const port = 3001;

// MIDDLEWARE
app.use(express.json());
app.use(cors());

const MONGO_URL="mongodb+srv://user69:passwordpassword@travely.cxjbvfx.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(MONGO_URL);
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
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Travely server listening on port ${port}`);
});
