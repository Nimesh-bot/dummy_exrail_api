const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { access_token, refresh_token } = require('../services/createToken');
const { verifyRefresh } = require('../middleware/auth.middleware');

const register = async (req, res, next) => {
    const user_info = req.body;

    try {
        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(user_info.password, salt);

        user_info.password = hashed_password;

        const temp_user = new User(user_info);
        const user = await temp_user.save();

        res.status(200).json({
            message: 'User registration successful',
            user: { name: user.username, email: user.email, role: user.role }
        })
    }
    catch(err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {   
        const check_user = await User.findOne({email: email});
        if(!check_user) throw new Error('User is not registered');

        const auth = await bcrypt.compare(password, check_user.password);
        if(!auth) throw new Error('Incorrect password');

        const access = await access_token(check_user._id);
        const refresh = await refresh_token(check_user._id);

        res.status(200).json({
            message: 'Logged in successfully',
            access,
            refresh
        })
    }
    catch(err) {
        next(err);
    }
}

const request_access = async (req, res, next) => {
    const { refresh_token } = req.body

    try {
        if(!refresh_token) throw new Error('Unauthorized access, refresh token not provided');
        const verify = await verifyRefresh(refresh_token);

        if(verify.Error) {
            return res.status(401).json({
                "Unauthorized": "Invalid Token"
            })
        };
        const access_token = await access_token(verify.aud);

        res.status(200).json({
            message: 'Access token generated successfully',
            access_token
        })
    }
    catch(err) {
        next(err);
    }
}

module.exports = { register, login, request_access }