import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import MongodbConnection from './connection.js';
import userRoute from './Routes/user.js';
import TaskRouter from './Routes/task.js';

dotenv.config();

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({
    service: 'task-manager-api',
    status: 'ok'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', async (req, res, next) => {
  try {
    await MongodbConnection(process.env.MONGO_DB_URL);
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/auth', userRoute);
app.use('/api/tasks', TaskRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;