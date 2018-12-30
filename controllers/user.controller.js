var User = require('../models/user.model');
var validateLogin = require('../helpers/validateLogin');
var validateRegister = require('../helpers/validateRegister');
const env=require('dotenv').config({path: './.env'}).parsed;
const jwt = require('jsonwebtoken');


exports.login = async function(req,res){
    const data = req.body;
    const errors = validateLogin(data);
    const { username } = data;
    const doesUserExists = await User.userExists(username);

    if (Object.keys(errors).length > 0) {
        res.json({ success: false, errors });
        return;
    }

    if (!doesUserExists) {
        res.json({ success: false, errors: { cause: "'user/password error' " } });
        return;
    }

    User.findOne(data, ('name', 'username'), (err, user) => {
        if (err) {
            res.json({ success: false, errors: { cause: "'Error in sever' " } });
        } else {
            if (user) {
                res.json({ success: true, user, token: user.generateToken() });
            } else {
                res.json({ success: false, errors: { cause: "'user/password error' " } });
            }
        }
    });
};

exports.create = async function(req,res){
    const data = req.body;
    const errors = validateRegister(data);

    if (Object.keys(errors).length > 0) {
        res.json({ success: false, errors });
        return;
    }

    const { username } = data;
    const doesUserExists = await User.userExists(username);

    if (doesUserExists) {
        res.json({ success: false, errors: { cause: "'User already exists' " } });
        return;
    }

    const user = new User(data);

    user.save((err, data) => {
        if (err) {
            res.json({ success: false, errors: { cause: "'Error in server' " } });
        } else {
            res.json({ success: true, user });
        }
    });
};

exports.getAllUsers = function (req, res) {
    User.find({}, (err, user) => {
        res.json(user);
    });
};

exports.isLoggedIn = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers.authorization;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, env.SECRET, function(err, decoded) {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Sign in to continue. Forbidden'
                });
            } else {
                // if everything is good, save to request for use in other routes
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(401).send({
            success: false,
            message: 'Sign in to continue.'
        });
    }
};
