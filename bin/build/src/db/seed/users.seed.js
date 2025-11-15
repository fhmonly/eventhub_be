"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
require("dotenv/config");
const index_1 = require("../index");
const schema_1 = require("../schema");
const bcrypt_1 = require("bcrypt");
function seedUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Seeding users...");
        const adminPassword = yield (0, bcrypt_1.hash)("admin123", 10);
        const userPassword = yield (0, bcrypt_1.hash)("user123", 10);
        yield index_1.db.insert(schema_1.users).values([
            {
                name: "admin",
                email: "admin@example.com",
                password: adminPassword,
                role: "admin",
            },
            {
                name: "johndoe",
                email: "john@example.com",
                password: userPassword,
                role: "user",
            },
        ]);
        console.log("Users seeded!");
        process.exit(0);
    });
}
