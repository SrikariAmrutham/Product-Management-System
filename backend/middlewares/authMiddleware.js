const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) { // bearer tells that the client is sending a token
        return res.status(401).json({ message: 'Token not provided or invalid' });
    }

    const token = authHeader.split(' ')[1]; // extract the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //decode and verifyv the token
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

exports.isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: 'Admins only: Access denied'});
    }
    next(); //next middleware
};