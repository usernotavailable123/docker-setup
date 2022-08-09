var jwt = require('jsonwebtoken');
const JWT_SECRET='welcometosecretsociety';


const fetchusers = (req,res,next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.status('401').send({error:'Please authenticate a valid token'});
    }
    try{
        console.log('secret',JWT_SECRET)
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
    }catch(error){
        console.log(error.message);
        res.status(401).send({error:'Please authenticate using a valid token'});
    }
    next();
}

module.exports = fetchusers;
