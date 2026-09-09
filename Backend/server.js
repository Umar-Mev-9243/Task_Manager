import dotenv from 'dotenv';
import express from 'express';
import MongodbConnection from './conection.js';
import userRoute from './Routes/user.js';
import cors from 'cors';
import { authMiddleware } from './middleware/auth.js';
import cookieParser from 'cookie-parser';
import TaskRouter from './Routes/task.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

MongodbConnection('mongodb://localhost:27017/Task_db');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userRoute);
app.use('/api/tasks', TaskRouter);

app.listen(PORT, () => console.log(`Server running on PORT: http://localhost:${PORT}`));