import express from 'express'
import noteRoutes from './routes/noteRoutes.js';
import { connectDb } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import dotenv from 'dotenv'

// import the cors
import cors from 'cors'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001
await connectDb();
// use cors middlware
app.use(cors({
    // it can be an array. you can whitelist different links
    origin: 'http://localhost:5173',
}))
app.use(express.json());
app.use(rateLimiter)
app.use('/api/notes', noteRoutes)


app.listen(PORT, ()=>{
    console.log(`Server is running in http://localhost:${PORT}`)
})

