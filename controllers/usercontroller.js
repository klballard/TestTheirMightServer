var express = require('express')
var router = express.Router() 
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
/*
 postman test for user creation
{
    "user":{
        "email":"testing@test.com",
        "password":"testing"
    }
}
*/

// Register a User
console.log('before')
router.post('/register', function(req,res) {
    console.log('middle');
    var email = req.body.user.email;
    var pass = req.body.user.password;
    User.create({
        email: email,
        passwordhash: bcrypt.hashSync(pass, 10)
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
    );
});



// Login
  
router.post('/login', function(req,res) {
                        
    User.findOne( {where: { username: req.body.user.email } } ).then(

         
        function(user) {
            
            if (user) {

                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {

                
                if (matches) {
                
                 var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                 res.json({
                     user: user,
                     message: "User has been successfully logged in!",
                     sessionToken: token
                 });
                }else {
                    res.status(502).send({ error: "Failed to authenticate."});
                }
                })
            } else { 
                res.status(500).send({ error: "Failed to authenticate." });  
            }
        },
        function(err) {
            res.status(501).send({ error: "Password did not match."}); 
        }
    );
});

module.exports = router;