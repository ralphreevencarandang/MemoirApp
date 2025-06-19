import ratelimit from "../config/upstash.js"

// bali this middleware is c-check niya muna kung success yung request based sa rate limiter
const rateLimiter = async(req, res, next)=>{
    try {
        // check if success and put the identifyer usually a user_id
        const {success} = await ratelimit.limit("my-limit-key")
        if(!success){
            return res.status(429).json({message: 'Too many request, please try again later'})
        }
        next()
    } catch (error) {
        console.error("Rate limit error", error);
        next(error);   
    }
    // basta middleware function may next dapat siya
}

export default rateLimiter