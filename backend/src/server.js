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
const __dirname = path.resolve()

await connectDb();
// use cors middlware

if(process.env.NODE_ENV !== "production"){

    app.use(cors({
        // it can be an array. you can whitelist different links
        origin: 'http://localhost:5173',
    }))
}

app.use(express.json());
app.use(rateLimiter)
app.use('/api/notes', noteRoutes)

app.use(express.static(path.join(__dirname, "../frontend/dist")))


if (process.env.NODE_ENV === "production"){

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
    });
}

app.listen(PORT, ()=>{
    console.log(`Server is running in http://localhost:${PORT}`)
})

