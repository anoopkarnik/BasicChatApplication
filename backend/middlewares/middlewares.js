const jwt = require('jsonwebtoken');
const { User } = require('../models/db');

const authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({error: 'Bearer token not given'});
    }
    token = token.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        const user = await User.findById(req.userId);
        if(!user) return res.status(404).json({error: 'User not found'});
        next();
    } catch (e) {
        return res.status(401).json({error: 'Unauthorized'});
    }
}

let numberOfRequestsForUser = {};

// Reset the counter every 5 seconds
setInterval(() => { numberOfRequestsForUser = {}; }, 1000);

const rateLimiter = (req, res, next) => {
    const username = req.headers.username; // Assuming username is in headers
    if (numberOfRequestsForUser[username]) {
        numberOfRequestsForUser[username]++;
        if (numberOfRequestsForUser[username] > 10) {
            return res.status(429).json({ msg: 'Too many requests' }); // 429 is the standard status code for too many requests
        }
    } else {
        numberOfRequestsForUser[username] = 1;
    }
    next();
};


let errorCount = 0;
const errorFunction = function(err,req,res,next){
	res.status(404).send({})
	errorCount++;
    console.log("Error count: ", errorCount);
}


module.exports = {authMiddleware , rateLimiter, errorFunction};