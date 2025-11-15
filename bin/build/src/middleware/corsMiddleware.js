"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const getLocalIP_1 = require("../utils/core/getLocalIP");
const localIP = (0, getLocalIP_1.getLocalIP)();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const localhostDomain = `http://localhost:${PORT}`;
const ipDomain = `http://${localIP}:${PORT}`;
const domains = [
    localhostDomain,
    ipDomain
];
const isLocalhost = (host) => host.trim() === 'localhost';
const isIP = (host) => /^(\d{1,3}\.){3}\d{1,3}$/.test(host.trim() || "");
if (!!HOST && !isLocalhost(HOST) && !isIP(HOST))
    domains.push(HOST);
const allowedOrigins = [
    ...domains
];
const corsOptions = {
    origin(origin, callback) {
        if (!origin)
            return callback(null, true); // Allow server-to-server or curl
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
};
exports.corsMiddleware = (0, cors_1.default)(corsOptions);
