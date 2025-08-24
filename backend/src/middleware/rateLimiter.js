import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await rateLimit.limit("my-limit-key"); // success need to be in {curly braces} becasue .limit method returns an object
        if (!success) return res.status(429).json({message: "Too Many Requests! Try again later"})

        next();
    } catch (error) {
        console.error("Rate limit error", error)
        next(error);
    }
}

export default rateLimiter;