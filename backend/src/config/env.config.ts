import dotenv from 'dotenv';

dotenv.config();


const env = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL,
    ENVIRONMENT: process.env.ENVIRONMENT,
}