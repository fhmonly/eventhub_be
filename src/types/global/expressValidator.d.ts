import { IUser } from "../../db-model";
import { AccessToken } from "../core/authToken";

declare module "express-serve-static-core" {
    interface Request {
        user?: AccessToken;
    }
}