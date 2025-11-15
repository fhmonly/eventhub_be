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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEventController = exports.updateEventController = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const reqValidator = [
    (0, express_validator_1.body)('title').optional().notEmpty().withMessage('Title cannot be empty'),
    (0, express_validator_1.body)('desc').optional().isString(),
    (0, express_validator_1.body)('location').optional().isString(),
    (0, express_validator_1.body)('startAt').optional().isISO8601().toDate(),
];
const reqHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const [event] = yield db_1.db.select().from(schema_1.events).where((0, drizzle_orm_1.eq)(schema_1.events.id, id));
        if (!event)
            throw http_errors_1.default.NotFound('Event not found');
        yield db_1.db.update(schema_1.events).set(req.body).where((0, drizzle_orm_1.eq)(schema_1.events.id, id));
        const [updatedEvent] = yield db_1.db.select().from(schema_1.events).where((0, drizzle_orm_1.eq)(schema_1.events.id, id));
        const resultResponse = {
            success: true,
            message: 'Event updated.'
        };
        res.json(resultResponse);
    }
    catch (err) {
        next(err);
    }
});
const reqHandlerDeleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const [event] = yield db_1.db.select().from(schema_1.events).where((0, drizzle_orm_1.eq)(schema_1.events.id, id));
        if (!event)
            throw http_errors_1.default.NotFound('Event not found');
        yield db_1.db.delete(schema_1.events).where((0, drizzle_orm_1.eq)(schema_1.events.id, id));
        const resultResponse = {
            success: true,
            message: 'Event deleted successfully'
        };
        res.json(resultResponse);
    }
    catch (err) {
        next(err);
    }
});
exports.updateEventController = [
    reqHandler
];
exports.deleteEventController = [
    reqHandlerDeleteEvent
];
