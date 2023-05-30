function handeServerError(res, error){
    console.log("Error: " + error);
    res.status(500).send({
        message:"Internal server error: " + error.message,
        status:500
    })
}

export function handleClientError(res, message, status){
    res.status(status).send({
        message: message,
        status:status
    });
}

export function errorHandler(handler){
    return async (req,res,next) =>{
        try{
            await handler(req,res,next);
        }
        catch(error){
            handeServerError(res,error)
        }
    }
}