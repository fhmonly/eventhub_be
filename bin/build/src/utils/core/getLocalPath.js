"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.root_path = root_path;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const path_1 = __importDefault(require("path"));
function root_path(pathStr) {
    return path_1.default.resolve(process.cwd(), pathStr);
}
