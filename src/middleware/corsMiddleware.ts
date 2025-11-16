import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

const isDevelopment = () => process.env.NODE_ENV === 'development'

const allowedOrigins = [
    ''
];

const corsOptions: cors.CorsOptions = {
    origin(origin, callback) {
        if (!origin) return callback(null, true); // Allow server-to-server or curl
        if (allowedOrigins.includes(origin)) return callback(null, true);
        if (isDevelopment()) return callback(null, true)
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
};

export const corsMiddleware = cors(corsOptions)