import express, { Router } from "express";
import bcrypt from 'bcrypt';
import User from "../model/user.js";
import { generateToken, verifyToken } from "../services/auth.js";
import { authMiddleware } from "../middleware/auth.js";
import { handleLogin, handleLogout, handleRegisteration, handleTaskauthme } from "../Controllers/user.js";

const userRouter = Router();

// Register Route
userRouter.post('/register', handleRegisteration);

userRouter.post('/login', handleLogin);

userRouter.get('/me', authMiddleware , handleTaskauthme);

userRouter.post('/logout', handleLogout);

export default userRouter;