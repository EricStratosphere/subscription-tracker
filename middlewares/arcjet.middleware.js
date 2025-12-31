import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    // console.log(" Arcjet middleware called! ");
    try{
        const decision = await aj.protect(req, {requested : 1});
        console.log("Arcjet decision: ", decision);
        console.log(decision.isDenied());
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message : `Rate limit exceeded`});
            }

            if(decision.reason.isBot()){
                return res.status(403).json({error : 'Bot detected'});
            }

            return res.status(403).json({error : 'Access denied'});
        }
        next();
    }catch(error){  
        console.log("Arcjet Middleware Error: ", error);
        next(error)     }
}


export default arcjetMiddleware;