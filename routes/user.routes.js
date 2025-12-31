import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';
const userRouter = Router();

userRouter.get('/', getUsers)

//the colon means it's a dynamic parameter, this means that each get request is unique based on the id value appended to the request.
userRouter.get('/:id', authorize, getUser)
//IMPORTANT NOTE: see how the authorize middleware function is chained here. This is how the authorize middleware is called without using app.use(middleware). That way, authorization is not needed for every single API call.

userRouter.post('/', (req, res) => {
    console.log("Someone called Post!");
    return res.send('CREATE new User');
})

userRouter.put('/:id', (req, res) => {
    return res.send('UPDATE new User');
})

userRouter.delete('/:id', (req, res) => {
    return res.send( {title : 'DELETE user'});
})


export default userRouter;