import { Router } from 'express';



const authRouter = Router();


//this is for handling all our Routes in our backend.

//routing is essentially connecting a url to some logic on the server that handles it.


//For example, a GET request to /api/profile/me
authRouter.post('/sign-up', (req, res)=> {
    return res.send( { title : 'Sign-Up' } )
});


authRouter.post('/sign-in', (req, res)=> {
    return res.send( { title : 'Sign-In' } )
});

authRouter.post('/sign-out', (req, res)=> {
    return res.send( { title : 'Sign-Out' } )
});


export default authRouter;