//is Authorized method
export function checkAuthorization(req,res,next){
        if(!req.session.isLoggedIn){
        res.status(403).send({message: "Not logged in"})
        }else{
            next();
        }
}
