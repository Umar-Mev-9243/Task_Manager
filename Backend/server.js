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
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

const startServer = async () => {
    try {
       await MongodbConnection(process.env.MONGO_DB_URL || 'mongodb://localhost:27017/Task_db');

       app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
       })

        
    } catch (error) {
        console.error('Database connection failure: ', error)
        process.exit(1)
    }
};

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        msg: 'Internal Server Error'
    })
})

app.use('/api/auth', userRoute);
app.use('/api/tasks', TaskRouter);

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok'
    })
})

startServer();
// app.listen(PORT, () => console.log(`Server running on PORT: http://localhost:${PORT}`));