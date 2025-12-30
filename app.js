
//app.js HOLDS THE CODE FOR THE MAIN BACKEND SERVER.
//setting up an express server

import express from 'express';
//we are able to use the import keyword thanks to our type set to module in package.json. Otherwise, we would be using require('express');

import { PORT } from './config/env.js'


import authRouter from './routes/auth.routes.js';

import subscriptionRouter from './routes/subscription.routes.js';

import userRouter from './routes/user.routes.js';
//this isn't necessary in our codebase but this is how we would use these APIs 


import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();
//express() functions initializes the app for express

app.use(express.json())
//express.json allows our app to handle jason data sent in requests.
app.use(express.urlencoded({extended : false}))
//this helps us to process form data sent by HTML forms in a simple format.

app.use(cookieParser());
//parse cookies.

//this is typically used in middleware. 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/users', userRouter);
//this means we can use the authRouter API by first adding the endpoint /api/v1/auth/ 

//basically, app.use links a url to a specific route for other APIs.

app.use(errorMiddleware);
app.get('/', (req, res) => {
  //the first thing you see when you go to the port where the backend server is running.
  return res.send('<div style="background-color : blue;">Welcome!</div>');
})

//app.listen in express is a function used to start a server and make it listen for incoming requests on a specified port and host.
app.listen(PORT, async () => {
  console.log(`Subscription Tracker running on http://localhost:${PORT}`);

  await connectToDatabase();
})
console.log("server running on 5500");

export default app;
