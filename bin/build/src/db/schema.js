"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokens = exports.events = exports.users = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const mysql_core_2 = require("drizzle-orm/mysql-core");
exports.users = (0, mysql_core_2.mysqlTable)("users", {
    id: (0, mysql_core_2.int)("id").primaryKey().autoincrement(),
    name: (0, mysql_core_2.varchar)("name", { length: 100 }).notNull(),
    email: (0, mysql_core_2.varchar)("email", { length: 128 }).notNull().unique(),
    password: (0, mysql_core_2.varchar)("password", { length: 255 }).notNull(),
    role: (0, mysql_core_1.mysqlEnum)("role", ["user", "admin"]).default("user"),
    createdAt: (0, mysql_core_2.timestamp)("created_at").defaultNow(),
});
exports.events = (0, mysql_core_2.mysqlTable)('events', {
    id: (0, mysql_core_2.int)('id').primaryKey().autoincrement(),
    title: (0, mysql_core_2.varchar)("title", { length: 100 }).notNull(),
    desc: (0, mysql_core_2.varchar)("desc", { length: 255 }),
    location: (0, mysql_core_2.varchar)("location", { length: 255 }),
    startAt: (0, mysql_core_2.timestamp)("start_at").notNull(),
    createdAt: (0, mysql_core_2.timestamp)("created_at").defaultNow(),
});
exports.refreshTokens = (0, mysql_core_2.mysqlTable)("refresh_tokens", {
    id: (0, mysql_core_2.int)("id").primaryKey().autoincrement(),
    userId: (0, mysql_core_2.int)("user_id").notNull(),
    token: (0, mysql_core_2.varchar)("token", { length: 512 }).notNull(),
    jti: (0, mysql_core_2.varchar)("jti", { length: 128 }).notNull(),
    deviceInfo: (0, mysql_core_2.varchar)("device_info", { length: 255 }),
    ipAddress: (0, mysql_core_2.varchar)("ip_address", { length: 45 }),
    expiresAt: (0, mysql_core_2.timestamp)("expires_at").notNull(),
    createdAt: (0, mysql_core_2.timestamp)("created_at").defaultNow(),
    revokedAt: (0, mysql_core_2.timestamp)("revoked_at"),
});
