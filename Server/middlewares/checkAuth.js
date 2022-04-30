const jwt = require('jsonwebtoken');

function checkifAuth(req,res,next){
    const token = req.headers.token;
    // console.log(token);
    if(token){
        const actualToken = token.split(" ")[1];

        jwt.verify(actualToken, process.env.SECRET,(e,user)=>{
            if(e) res.status(403).json('Token is not valid');
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You Are Not Authenticated");
    }
}

module.exports = checkifAuth;