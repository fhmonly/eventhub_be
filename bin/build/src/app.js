"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const getLocalPath_1 = require("./utils/core/getLocalPath");
const corsMiddleware_1 = require("./middleware/corsMiddleware");
const exceptionMiddleware_1 = require("./middleware/exceptionMiddleware");
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
app.use(corsMiddleware_1.corsMiddleware);
app.options('*', corsMiddleware_1.corsMiddleware);
app.use((req, _res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
});
// other middleware
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// 🖼️ View engine
app.set('views', (0, getLocalPath_1.root_path)('src/views'));
app.set('view engine', 'ejs');
// ✅ Basic endpoint untuk cek server hidup
app.get('/', function (req, res) {
    res.json({
        status: 'running',
        developer: 'Fahim',
        project: 'Stock Prediction with ARIMA',
    });
});
// 🔗 API Router
app.use('/api', api_1.default);
// 🚨 5. Tangani CORS error secara eksplisit
app.use(((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        console.error('❌ CORS error:', req.headers.origin);
        return res.status(403).json({ error: 'CORS policy does not allow this origin.' });
    }
    next(err);
}));
// ❗ 6. Global error handler (dari kamu)
app.use(exceptionMiddleware_1.exceptionMiddleware);
exports.default = app;
