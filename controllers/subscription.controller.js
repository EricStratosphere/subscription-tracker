import { workflowClient } from '../config/upstash.js';
import Subscription from '../models/subscription.model.js'
import {SERVER_URL} from '../config/env.js'
export const createSubscription = async (req, res, next) => {
    try{    
        const subscription = await Subscription.create({
            ...req.body,
            user : req.user._id,
        });;

        const {workflowRunId} = await workflowClient.trigger({
            url : `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body : {
                subscriptionId : subscription.id,
            },
            headers : {
                'content-type' : 'application/json',
            },
            retries : 0,
        })

        res.status(201).json({success : true, data : subscription})
    }   
    catch (error){
        next(error);
    }
}


export const getUserSubscriptions = async (req, res, next) => {
    try{
        if(req.user.id !== req.params.id){
            //check if the user making the request is the same as the one in the token.
            const error = new Error("Not the owner of the account!");
            error.status = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({user : req.params.id});
        //note that the subscription schema's user field is a foreign key that references a specific user's ID. Hence why the object being passed into the find method is an object with a user field containing the param id. 
        
        res.status(201).json({sucess : true, data : subscriptions});

    }   
    catch(e){
        next(e)
    }
}

/*{
  "name" : "Netflix Premium",
  "price" : 15.99,
  "currency" : "USD",
  "frequency" : "monthly",
  "category" : "entertainment",
  "startDate" : "2024-02-01T00:00:00.000Z",
  "paymentMethod" : "Credit Card"
} */