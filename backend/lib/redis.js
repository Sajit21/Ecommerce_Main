import Redis from "ioredis"
import dotenv from "dotenv";

dotenv.config();



export const redis = new Redis(process.env.UPTASH_REDIS_URI);
// await redis.set('foo', 'bar'); just to know how it actually works