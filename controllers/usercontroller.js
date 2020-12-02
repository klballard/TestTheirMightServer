let {Router} = require('express');
//let sequelize = require('../db');
//const Sequelize = require('sequelize');
const {UserModel} = require('../models');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

/*
 postman test for user creation
{
    "user":{
        "email":"testing@test.com",
        "password":"testing"
    }
}
*/
const router = Router();
router.get('/test', function(req, res) {
    res.send('hello, from test')
})

//Find All Users
router.get("/getall", (req, res) => {
    UserModel.findAll()
    .then(function findAllSuccess(data){
        res.json(data);
    },
    function findAllError(err){
        res.send(500,err.message);
    }
    );
    
});

//! Register a User

router.post('/register', function(req,res) {
    UserModel.create({
        email: req.body.user.email,
        passwordhash: bcrypt.hashSync(req.body.user.password, 10),
    }).then(
        function createSuccess(user) {
            console.log('success')
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'Account has been registered.',
                sessionToken: token 
            });
        },
        function createError(err) {
            console.log(err)
            res.send(500, err.message);
        }
    ).catch((err) => {
        console.log(err)
    })
});



// Login
  
router.post('/login', function(req, res) {
    UserModel.findOne({ where: {email: req.body.user.email} })
    .then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
                        res.json({
                            user: user,
                            message: "User has been successfully authenticated",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "User sign in failed." });
                    }
                });
            } else {
                res.status(500).send({ error: "Authentication failed." });
            }
        },
        function (err) {
            res.status(501).send({ error: "User sign in failed." })
        }
    );
});


module.exports = router;