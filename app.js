//setting up an express server

import express from 'express';
import { PORT } from './config/env.js'


import authRouter from './routes/auth.routes.js';

import subscriptionRouter from './routes/subscription.routes.js';

import userRouter from './routes/user.routes.js';
//this isn't necessary in our codebase but this is how we would use these APIs 


import connectToDatabase from './database/mongodb.js';
import { connect } from 'http2';

const app = express();

//this is typically used in middleware.
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/users', userRouter);
//this means we can use the authRouter API by first adding the endpoint /api/v1/auth/ 

app.get('/', (req, res) => {
    //the first thing you see when you go to the port where the backend server is running.
    res.send("Welcome to the subscription tracker API!");
})

//app.listen in express is a function used to start a server and make it listen for incoming requests on a specified port and host.
app.listen(PORT, async ()=>{
    console.log(`Subscription Tracker running on http://localhost:${PORT}`);

    await connectToDatabase();
})
console.log("server running on 5500");

export default app;