import Subscription from '../models/subscription.model.js'
export const createSubscription = async (req, res, next) => {
    try{    
        const subscription = await Subscription.create({
            ...req.body,
            user : req.user._id,
        })
        res.status(201).json({success : true, data : subscription})
    }   
    catch (error){
        next(error);
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