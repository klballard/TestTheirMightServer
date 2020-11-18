let express = require('express')
let router = express.Router() 
let sequelize = require('../db');
let User = sequelize.import('../models/user');
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
router.get('/get', function(req, res) {
    res.send('hello, from test')
})

// Register a User
console.log('before')
router.post('/register', function(req,res) {
    console.log('middle');
    User.create({
        email: req.body.user.email,
        passwordhash: bcrypt.hashSync(req.body.user.password, 10)
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