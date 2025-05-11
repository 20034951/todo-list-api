require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('authHeader -> ', authHeader);
    if(authHeader === process.env.API_KEY){
        next();
    }else{
        res.status(401).json({error: "Unauthorized: Invalid API key"});
    }
};