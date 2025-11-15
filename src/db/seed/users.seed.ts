import "dotenv/config";
import { db } from "../index";
import { users } from "../schema";
import { hash } from "bcrypt";

export async function seedUsers() {
    console.log("Seeding users...");

    const adminPassword = await hash("admin123", 10);
    const userPassword = await hash("user123", 10);

    await db.insert(users).values([
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
}
