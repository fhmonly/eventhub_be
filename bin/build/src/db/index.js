"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.pool = void 0;
require("dotenv/config");
const mysql2_1 = require("drizzle-orm/mysql2");
const promise_1 = __importDefault(require("mysql2/promise"));
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = +(process.env.DB_PORT || 3306);
const DB_DATABASE = process.env.DB_DATABASE;
exports.pool = promise_1.default.createPool({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USERNAME,
    password: DB_PASSWORD
});
exports.db = (0, mysql2_1.drizzle)(exports.pool);
