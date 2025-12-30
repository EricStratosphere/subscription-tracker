import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';



const authRouter = Router();


//this is for handling all our Routes in our backend.

//routing is essentially connecting a url to some logic on the server that handles it.


//For example, a GET request to /api/profile/me
authRouter.post('/sign-up', signUp);

authRouter.post('/sign-in', signIn);

authRouter.post('/sign-out', signOut);


export default authRouter;