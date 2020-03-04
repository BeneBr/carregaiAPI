const jwt = require('jsonwebtoken');
const authConfig = require('../config/key');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({message: "NO TOKEN PROVIDED"});
    }
     const parts = authHeader.split(' ');
     if(!parts.length === 2){
         return res.status(401).send({message: "TOKEN ERROR"});
     }

     const [scheme, token] = parts;
     
     if(!/^Bearer$/i.test(scheme)){
         return res.status(401).send({message: "MALFORMATED TOKEN"});
     }


    jwt.verify(token, authConfig.secret, (err, decoded) =>{

        if(err) return res.status(401).send({message: "INVALID TOKEN"});

        req.cpf = decoded.cpf;
        req.fullName = decoded.fullName;
        return next();
    });
}