"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seedAll_1 = require("../../utils/core/seedAll");
const users_seed_1 = require("./users.seed");
(0, seedAll_1.seedAll)([
    users_seed_1.seedUsers
]);
