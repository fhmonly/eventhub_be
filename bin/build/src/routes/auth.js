"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_1 = require("../controller/auth/register");
const login_1 = require("../controller/auth/login");
const logout_1 = require("../controller/auth/logout");
const refresh_1 = require("../controller/auth/refresh");
var router = express_1.default.Router();
router.post('/register', ...register_1.registerController);
router.post('/login', ...login_1.loginController);
router.post('/logout', ...logout_1.logoutController);
router.post('/logout-all', ...logout_1.logoutAllController);
router.post('/refresh', ...refresh_1.refreshTokenController);
exports.default = router;
