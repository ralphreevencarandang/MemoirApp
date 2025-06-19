import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// call the dotenv package to access the environment variables
import dotenv from 'dotenv';
dotenv.config();

// Create a ratelimiter that allows 10 request per 20 sec
const ratelimit = new Ratelimit({
    // select the environment variable
    redis: Redis.fromEnv(),
    // 10 request for 20 secons
    limiter: Ratelimit.slidingWindow(10, "20 s"),
})
export default ratelimit