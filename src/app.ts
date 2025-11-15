import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import { root_path } from './utils/core/getLocalPath';
import { corsMiddleware } from './middleware/corsMiddleware';
import { exceptionMiddleware } from './middleware/exceptionMiddleware';
import APIRouter from './routes/api'

const app = express();


app.use(corsMiddleware);
app.options('*', corsMiddleware);

app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// other middleware
app.use(compression());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 🖼️ View engine
app.set('views', root_path('src/views'));
app.set('view engine', 'ejs');


// ✅ Basic endpoint untuk cek server hidup
app.get('/', function (req, res) {
  res.json({
    status: 'running',
    developer: 'Fahim',
    project: `😎Express JS template with TS`,
    github: 'https://github.com/fhmonly'
  });
});

// 🔗 API Router
app.use('/api', APIRouter);

// 🚨 5. Tangani CORS error secara eksplisit
app.use(((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message === 'Not allowed by CORS') {
    console.error('❌ CORS error:', req.headers.origin);
    return res.status(403).json({ error: 'CORS policy does not allow this origin.' });
  }
  next(err);
}) as express.ErrorRequestHandler);

// ❗ 6. Global error handler (dari kamu)
app.use(exceptionMiddleware);

export default app;