import express, { Router } from "express";
import bcrypt from 'bcrypt';
import User from "../model/user.js";
import { generateToken, verifyToken } from "../services/auth.js";
import { authMiddleware } from "../middleware/auth.js";
import { handleLogin, handleRegisteration, handleTaskauthme } from "../Controllers/user.js";

const userRouter = Router();

// Register Route
userRouter.post('/register', handleRegisteration);

userRouter.post('/login', handleLogin);

userRouter.get('/me', authMiddleware , handleTaskauthme);

userRouter.get('/logout', (req, res) => {
    res.clearCookie('token', {httpOnly: true});
    res.status(200).json({msg: 'cookie cleared and user logged out'})
})

export default userRouter;