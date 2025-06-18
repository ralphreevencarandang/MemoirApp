import mongoose from "mongoose"
export const connectDb= async()=>{
    try{
        // put the process.env.url_name
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DATA BASE CONNECTED')
    }catch(error){
        console.error('Error connecting database', error)
        process.exit(1)
    }
}