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
exports.createEventController = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const express_validator_1 = require("express-validator");
const reqValidator = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('desc').optional().isString(),
    (0, express_validator_1.body)('location').optional().isString(),
    (0, express_validator_1.body)('startAt').notEmpty().withMessage('Start date is required').isISO8601().toDate(),
];
const reqHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, desc, location, startAt } = req.body;
        const [newEvent] = yield db_1.db.insert(schema_1.events).values({ title, desc, location, startAt }).$returningId();
        const resultResponse = {
            success: true,
            data: {
                id: newEvent.id
            }
        };
        res.status(201).json(resultResponse);
    }
    catch (err) {
        next(err);
    }
});
exports.createEventController = [
    reqHandler
];
