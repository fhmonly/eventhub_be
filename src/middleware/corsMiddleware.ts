import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { getLocalIP } from '../utils/core/getLocalIP';

const localIP = getLocalIP()

const HOST = process.env.HOST
const PORT = process.env.PORT

const localhostDomain = `http://localhost:${PORT}`
const ipDomain = `http://${localIP}:${PORT}`

const domains = [
    localhostDomain,
    ipDomain
]

const isLocalhost = (host: string) => host.trim() === 'localhost'
const isIP = (host: string) => /^(\d{1,3}\.){3}\d{1,3}$/.test(host.trim() || "");

if (!!HOST && !isLocalhost(HOST) && !isIP(HOST)) domains.push(HOST)

const allowedOrigins = [
    ...domains
];

const corsOptions: cors.CorsOptions = {
    origin(origin, callback) {
        if (!origin) return callback(null, true); // Allow server-to-server or curl
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
};

export const corsMiddleware = cors(corsOptions)