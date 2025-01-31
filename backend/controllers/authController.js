const bcrypt = require('bcryptjs'); // to hash passwords
const jwt = require('jsonwebtoken'); // to generate JWT tokens, user for user authentication and session management
const User = require('../models/User');

exports.register = async(req, res) =>{
    const {username, email, password} = req.body;
    const hashedPassword = await bycrypt.hash(password, 10); // hash the password, (10) indicates the salt rounds(computional cost factor to strengthen the hashing)
    const newUser = await User.create({username, email, password: hashedPassword}) //save to db
    res.json(newUser);
};

exports.login = async(req, res) =>{    
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) { // check if user exists and password matches
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role }, // payload: contains data being transmitted
        process.env.JWT_SECRET, 
        { expiresIn: '1d' });
    res.json({ token });
};