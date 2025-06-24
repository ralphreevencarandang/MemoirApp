import express from 'express'
import noteRoutes from './routes/noteRoutes.js';
import { connectDb } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import dotenv from 'dotenv'
import path from 'path'

// import the cors
import cors from 'cors'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001


await connectDb();
// use cors middlware

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "https://memoirapp-frontend.onrender.com",
    })
  );
}

app.use(express.json());
app.use(rateLimiter)
app.use('/api/notes', noteRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running in http://localhost:${PORT}`)
})

