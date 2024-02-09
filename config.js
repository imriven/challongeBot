// config.js
import dotenv from "dotenv"
dotenv.config()

const config = {
    challongeApiKey: process.env.CHALLONGE_API_KEY,
};

export default config;