"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = +process.env.DB_PORT || 3306;
const DB_DATABASE = process.env.DB_DATABASE;
let mysqlConfig = {
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USERNAME,
        database: DB_DATABASE,
    },
};
if (!!DB_PASSWORD)
    Object.assign(mysqlConfig.dbCredentials, {
        password: DB_PASSWORD
    });
exports.default = (0, drizzle_kit_1.defineConfig)(mysqlConfig);
