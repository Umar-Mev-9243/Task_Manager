import { verifyToken } from "../services/auth.js";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;

    if(!token){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    const user = verifyToken(token);

    if(!user){
        return res.status(401).json({
            message: 'invalid or expired token'
        })
    }

    req.user = user;

    next();
}