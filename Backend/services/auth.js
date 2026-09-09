import 'dotenv/config'
import JWT from 'jsonwebtoken'


const secret_key = process.env.JWTSECRETKEY;

if(!secret_key){
    console.log('NO!, secret key found');
}

export const generateToken = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
    }

    const token = JWT.sign(payload, secret_key);

    return token
}

export const verifyToken = (token) => {
    try {
        const verifiedToken = JWT.verify(token, secret_key);
        return verifiedToken;
        
    } catch (error) {

        return null
    }

}
