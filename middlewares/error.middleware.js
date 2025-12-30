// ERROR HANDLING: a backend software typically looks like this.


//Before you ask, our service already has an error provided if something goes wrong, why do we need to write more errors?

// error middleware expands upon the used service's errors which allows us to find more details about the errror in question.
const errorMiddleware = (err, req, res, next) => {
    //Paramaters involved : err, the error itself. 
    // req: The request that called an error.

    try{
        let error = { ...err };
        error.message = err.message;
        console.error(err);

        //What type of error could it be? The error middleware is what identifies the type of error.

        //Mongoose bad ObjectId
        if(err.name === 'CastError'){
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key
        if(err.code === 11000){
            const message = 'Duplicate field value entered';
            error = newError(message);
            error.statusCode = 400;
        }

        //Mongoose validation error.
        //if there is more than one error.
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error("Validation error: " + message.join(', '));
            //note, 
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({success : false, error : error.message || 'Server Error'});

        //note that res.send and res.json essentially both send the same thing, except that JSON insists that its contents are specifically javascript objects while send can send other content not just jsons.
    }
    catch(error){
        next(error);
    }
}

export { errorMiddleware } 