import User from "../model/user.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../services/auth.js";   

export const handleRegisteration = async (req, res) => {
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
    res.cookie('token', token, {httpOnly: true});

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
}

export const handleLogin = async (req, res) =>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(401).send({message: 'User does not exist'});

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) return res.status(401).send({message: 'invalid password'});

    const token = generateToken(user);
    res.cookie('token', token, {httpOnly: true});

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

}

export const handleTaskauthme = async (req, res) => {
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
}