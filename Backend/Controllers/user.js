import User from "../model/user.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../services/auth.js";   

export const handleRegisteration = async (req, res) => {
    try {
        const {name, email, password} = req.body;
    
    const userExist = await User.findOne({email});
    if(userExist) return res.status(401).send({message: 'User already exist'})

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    const token = generateToken(user);
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const safeUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    res.status(201).json({
        message: 'User registered Successfully',
        user: safeUser
    });
    } catch (error) {
        res.send(error)
    }
}

export const handleLogin = async (req, res) =>{
   try {
     const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(401).send({message: 'User does not exist'});

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) return res.status(401).send({message: 'invalid password'});

    const token = generateToken(user);
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const safeUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    res.status(200).json({
        message: 'login successfull',
        user: safeUser
    });
   } catch (error) {
        res.send(error);
   }

}

export const handleTaskauthme = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

    if(!user){
        return res.status(404).json({
            message: 'User not found'
        })
    }

     const safeUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    res.json({
        user: safeUser
    });

    } catch (error) {
        res.send(error);
    }
}

export const handleLogout = (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === 'production';

        res.clearCookie('token', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({msg: 'cookie cleared and user logged out'});

    } catch (error) {

        res.send(error);
        
    }
    
}