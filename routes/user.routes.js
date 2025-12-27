import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    return res.send({title : 'GET all users'});
})

//the colon means it's a dynamic parameter, this means that each get request is unique based on the id value appended to the request.
userRouter.get('/:id', (req, res) => {
    return res.send('GET user details');
})


userRouter.post('/', (req, res) => {
    return res.send('CREATE new User');
})

userRouter.put('/:id', (req, res) => {
    return res.send('UPDATE new User');
})

userRouter.delete('/:id', (req, res) => {
    return res.send( {title : 'DELETE user'});
})


export default userRouter;