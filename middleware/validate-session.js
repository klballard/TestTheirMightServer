const jwt = require('jsonwebtoken');
const { UserModel } = require('../models'); 
//var sequelize = require('../db');
//const Sequelize = require('sequelize');
//var User = require('../models/user')(sequelize, Sequelize);

const validateJWT = async (req, res, next) => {
    if (req.methond == "OPTIONS") {
        next();
    } else if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
    ) {
        const {authorization} = req.headers;
        const payload = authorization
        ? jwt.verify(
            authorization.includes("Bearer")
            ? authorization.split(" ")[1]
            : authorization,
            process.env.JWT_SECRET
        )
        : undefined;
        if (payload) {
            let foundUser = await UserModel.findOne({ where: { id: payload.id } });

            if (foundUser) {
                req.user = foundUser;
                next();
            } else {
                res.status(400).send({message: 'Not authorized.'})
            }
        } else {
            res.status(401).send({message: 'Invalid token.'})
        }
    } else {
        res.status(403).send({message: 'Forbidden.'})
    }
}

module.exports = validateJWT;


// const validateSession = (req, res, next) => { 
//     const token = req.headers.authorization;
//     console.log(req.headers)
//     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//          console.log(`INVALID TOKEN: ${decodedToken}`)
//         if (!err && decodedToken) {
//             User.findOne({ where: {id: decodedToken.id}})
//             .then(user => {
//                 if (!user) throw 'err';
//                 req.user = user;
//                 return next();
//             })
//             .catch(err => {next(err); console.log('this could be where it broke')})
//         } else {
//             req.errors = err;
//             res.status(401).send("This is a bad token")
//         }
//     })
// };


