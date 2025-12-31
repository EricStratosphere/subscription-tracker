import {Router} from 'express';
import { createSubscription } from '../controllers/subscription.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';
const subscriptionRouter = Router();
//a router essentially functions as a signal that lets its endpoints be visible to the main app's APIs. The main app can use app.use() to link the router along with its routes to a specific url.

subscriptionRouter.get('/', (req, res) => {
    return res.send( {title : 'GET all subscriptions'} )
})

subscriptionRouter.get('/:id', (req, res) => {
    return res.send( {title : 'GET subscription details'} )
})

subscriptionRouter.post('/:id', authorize, createSubscription)

subscriptionRouter.put('/:id', (req, res) => {
    return res.send( {title : 'UPDATE subscription'} )
})

subscriptionRouter.delete('/:id', (req, res) => {
    return res.send( {title : 'DELETE subscription'} )
})

subscriptionRouter.get('/user/:id', (req, res) => {
    return res.send( {title : 'GET all user subscriptions'} )
})


subscriptionRouter.put('/:id/cancel', (req, res) => {
    return res.send( {title : 'CANCEL subscription'} )
})


subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    return res.send( {title : 'GET upcoming renewals'} )
})


export default subscriptionRouter;