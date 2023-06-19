// GUIDE TO USE THIS APP
// run 'npm install' at terminal to install all packages (first time only)
// run 'npm run dev' at terminal to start the app
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import multer from 'multer'
import path from 'path'


const app = express();
const port = 3001;

// MIDDLEWARE
app.use(express.json());
app.use(cors());

const MONGO_URL="mongodb+srv://user69:passwordpassword@travely.cxjbvfx.mongodb.net/?retryWrites=true&w=majority";
// const MONGO_URL="mongodb+srv://admin:admin@cluster0.rfieoui.mongodb.net/?retryWrites=true&w=majority";

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


// let frontend read images
const currentWorkingDirectory = process.cwd();
app.use("/images", express.static(path.join(currentWorkingDirectory, "public/images")));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {

    const fileName = req.body.name; // Use the filename sent from the frontend
    cb(null, fileName);
  },
});

const upload = multer({storage});
// app.post("/api/upload", upload.array('file',10),(req, res) => {
//   try {
//     console.log(req.files); // Logs any files
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


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
