import dotenv from "dotenv"

if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}

const config = {
    FRONTEND_URL: process.env.FRONTEND_URL,
    PORT: process.env.PORT,
    BACKEND_URL: process.env.BACKEND_URL,
    MONGO_URI: process.env.MONGO_URI,
    TOKEN: process.env.JWT_SECRET_KEY
}

export default config
