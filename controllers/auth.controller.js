import mongoose from 'mongoose'
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs' 
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js'
//What is a req? -> req.body is an object containing data from the client.


export const signUp = async (req, res, next) =>{
    //Implement sign up logic here
    const session = await mongoose.startSession();
    //note, this session has nothing to do with a user session this is a mongoose session   
    //starting a mongoose session follows the practice of atomic operations.
    //where a database operations MUST be atomic. If a process involves a sequence of operations, then that sequence must all be correct in order for them to execute, if one is not, then the entire process aborts.
    session.startTransaction();

    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        //if it doesn't exist, then hash the user's password because passwords are NOT allowed to be stored in the database as is.

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUsers = await User.create([{name, email, password : hashedPassword}], { session })
        console.log("HELLO!")
        console.log(newUsers);
        if(!newUsers){
            const error = new Error("Validation Error. Failed to create users.");
            error.statusCode = 400;
            throw error;
        }
        //passing session acts as a dependency that means we are NOT going to create the user yet, since the session is still going, until session commits the transaction at the end of the try block. if session aborts, then session does not 

        const token = jwt.sign({userId : newUsers[0]._id}, JWT_SECRET, {expiresIn : JWT_EXPIRES_IN})
        await session.commitTransaction();
        session.endSession();
        res.status(201).json(
            {   success : true, 
                message :  'User created successfully',
                data : {
                token, 
                user : newUsers[0]
                }
            })
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {

}

export const signOut = (req, res, next) => {

}