import { users } from "../../db/schema";

export type RefreshToken = {
    userId: number;
    jti: string
}

export type AccessToken = {
    userId: number,
    role: typeof users.role.enumValues[number]
}