const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res,next) =>{
    const authHeader = req.header('Authorization')
    //console.log(authHeader);
    // const authHeader1 = req.headers.authorization;
    // console.log(authHeader1);
    const token = authHeader.split(' ')[1];
   // console.log(token);

    if (!token) {
        return res.status(401).json({message: "Please login first"});
    }

  
    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            return res.status(403).json({message:"Bad Credentials!!",success:false});
        }
        console.log("User ==> "+JSON.stringify(user));
        req.user = user;
        next();
    });
   
}

module.exports = isAuthenticated;


