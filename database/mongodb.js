//THIS PART HERE IS RESPONSIBLE FOR CONNECTIVITY WITH OUR MONGODB DATABASE

import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js'

if(!DB_URI){
    throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');
}

//COnnect to db

//technically, this part has nothing to do with expresjs na, the point of mongoose or mongodb is to be used in conjunction with 

const connectToDatabase = async () => {
    try{
        await mongoose.connect(DB_URI);

        console.log('Connected to Database in ' + NODE_ENV + ' mode');
    }
    catch(error){
        console.log('Error connecting to database: ', error);
    }
}

export default connectToDatabase