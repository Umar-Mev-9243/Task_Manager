import dotenv from 'dotenv';
import express from 'express';
import MongodbConnection from './conection.js';
import userRoute from './Routes/user.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import TaskRouter from './Routes/task.js';
import  helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


MongodbConnection(process.env.MONGO_DB_URL || 'mongodb://localhost:27017/Task_db');

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

// app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`)
//     })

export default app;