const { messaging } = require("firebase-admin");
const jwt = require ("jsonwebtoken");

function auth(req,res,next){
    const token = req.cookies.token;
    
    if(!token){
        return(res.status (401).json({
             message:"Unauthorized"
        })
       
    )}

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    }
    catch(err){
        return(
            res.status(401).json({
                message:"Unauthorized"
            })
        )
    }
}

module.exports = auth;

// now this middleware has only one work which is to tell whether the user accessing the site is a logged in user or not