"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const env = fs_1.default.readFileSync('.env', 'utf-8');
const example = env
    .split('\n')
    .map((line) => {
    if (line.trim().startsWith('#') || !line.includes('='))
        return line;
    return line.split('=')[0] + '=';
})
    .join('\n');
fs_1.default.writeFileSync('.env.example', example);
console.log('.env.example created!');
