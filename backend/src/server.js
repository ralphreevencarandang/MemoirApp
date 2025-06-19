import express from 'express'
import noteRoutes from './routes/noteRoutes.js';
import { connectDb } from './config/db.js';

import rateLimiter from './middleware/rateLimiter.js';
// import the dotenv package
import dotenv from 'dotenv'
// call the dotenv config in server
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001
await connectDb();

app.use(express.json());
// use the middleware
app.use(rateLimiter)
app.use('/api/notes', noteRoutes)


app.listen(PORT, ()=>{
    console.log(`Server is running in http://localhost:${PORT}`)
})

