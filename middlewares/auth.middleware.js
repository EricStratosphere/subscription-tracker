import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js'
export const authorize = async (req, res, next) => {
    // console.log("I am from a different middleware!");
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token) return res.status(401).json({message : 'Unauthorized'});

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if(!user) return res.status(401).json({message : 'Unauthorized'});

        req.user = user;

        next();
    }
    catch(error){
        res.status(401).json({message : 'Unauthorized', error : error.message});
        next(error);
    }
}

export const customFunc = async(req, res, next) => {
    console.log("I am a middleware");
    next();
}