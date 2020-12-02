var jwt = require('jsonwebtoken');
var sequelize = require('../db');
const Sequelize = require('sequelize');
var {UserModel} = require('../models');

const validateSession = (req, res, next) => { 
    const token = req.headers.authorization;
    console.log(req.headers)
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        // console.log(`INVALID TOKEN: ${decodedToken}`)
        if (!err && decodedToken) {
            UserModel.findOne({ where: {id: decodedToken.id}})
            .then(user => {
                if (!user) throw 'err';
                req.user = user;
                return next();
            })
            .catch(err => {next(err); console.log('this could be where it broke')})
        } else {
            req.errors = err;
            res.status(401).send("This is a bad token")
        }
    })
};

module.exports = validateSession;
