import { mysqlEnum } from "drizzle-orm/mysql-core";
import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 128 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: mysqlEnum("role", ["user", "admin"]).default("user"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const events = mysqlTable('events', {
    id: int('id').primaryKey().autoincrement(),
    title: varchar("title", { length: 100 }).notNull(),
    desc: varchar("desc", { length: 255 }),
    location: varchar("location", { length: 255 }),
    startAt: timestamp("start_at").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
})

export const refreshTokens = mysqlTable("refresh_tokens", {
    id: int("id").primaryKey().autoincrement(),
    userId: int("user_id").notNull(),
    token: varchar("token", { length: 512 }).notNull(),
    jti: varchar("jti", { length: 128 }).notNull(),
    deviceInfo: varchar("device_info", { length: 255 }),
    ipAddress: varchar("ip_address", { length: 45 }),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    revokedAt: timestamp("revoked_at"),
});
