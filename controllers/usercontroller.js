const router = require("express").Router();
//const { UserModel } = require('../models/user');
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const { UniqueConstraintError } = require("sequelize/lib/errors");
let sequelize = require('../db');
const Sequelize = require('sequelize');
let UserModel = require('../models/user')(sequelize, Sequelize);
const validateJWT = require("../middleware/validate-session");
//const User = require("../models/user");
/*
 postman test for user creation
{
    "user":{
        "email":"testing@test.com",
        "password":"testing"
    }
}
*/
router.get("/test", function (req, res) {
  res.send("hello, from test");
});

//!Find All Users

router.get('/getall', validateJWT, async (req, res) => {
    try {
        await models.UserModel.findAll({
            include: [
                {
                    model: models.FighterModel,
                    include: [
                        {
                            model: models.TeamModel
                        }
                    ]
                }
            ]
        })
        .then(
            users => {
                res.status(200).json({
                    users: users
                });
            }
        )
    } catch (err) {
        res.status(500).json({ error: `Failed to retrieve users: ${err}` });
    }
});

// router.get("/getall", (req, res) => {
//   User.findAll().then(
//     function findAllSuccess(data) {
//       res.json(data);
//     },
//     function findAllError(err) {
//       res.send(500, err.message);
//     }
//   );
// });

//! Delete a User
router.delete("/:id", function (req, res) {
  var data = req.params.id;

  UserModel.destroy({
    where: { id: data },
  }).then(
    function deleteUserSuccess(data) {
      res.send("You deleted a user.");
    },
    function deleteUserFail(err) {
      res.send(500, err.message);
    }
  );
});

//! Register a User

router.post("/register", async (req, res) => {
  const { email, passwordhash } = req.body.user;
  try {
    await models.UserModel.create({
      email,
      passwordhash: bcrypt.hashSync(passwordhash, 13),
      isAdmin: false,
    })
    .then(
        user => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });
          
              res.status(201).json({
                message: "User successfully registered",
                user: user,
                sessionToken: `Bearer ${token}`,
              });
        }
    )
    
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Email already in use.",
      });
    } else {
      res.status(500).json({
        message: "Failed to register user.",
      });
    }
  }
});

// router.post('/register', function(req,res) {
//     User.create({
//         email: req.body.user.email,
//         passwordhash: bcrypt.hashSync(req.body.user.password, 10),
//         isAdmin: false
//     }).then(
//         function createSuccess(user) {
//             console.log('success')
//             var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

//             res.json({
//                 user: user,
//                 message: 'Account has been registered.',
//                 sessionToken: token
//             });
//         },
//         function createError(err) {
//             console.log(err)
//             res.send(500, err.message);
//         }
//     ).catch((err) => {
//         console.log(err)
//     })
// });

//! Login

router.post("login", async (req, res) => {
  let { email, passwordhash } = req.body.user;

  try {
    await models.UserModel.findOne({
      where: {
        email
      },
    })
    .then(
        user => {
            if (user) {
                bcrypt.compare(passwordhash, user.passwordhash, (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                        res.json({
                            user: user,
                            message: 'Logged in.',
                            sessionToken: `Bearer ${token}`
                        })
                    } else {
                        res.status(502).send({
                            error: 'Bad gateway.'
                        })
                    }
                })
            } else {
                res.status(500).send({
                    error: 'Failed to authenticate.'
                })
            }
        }
    )
  } catch (err) {
      res.status(501).send({
          error: 'Server does not support this functionality.'
      })
  }
})
// router.post("/login", function (req, res) {
//   User.findOne({ where: { email: req.body.user.email } }).then(
//     function (user) {
//       if (user) {
//         bcrypt.compare(
//           req.body.user.password,
//           user.passwordhash,
//           function (error, matches) {
//             if (matches) {
//               let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//                 expiresIn: 60 * 60 * 24,
//               });
//               res.json({
//                 user: user,
//                 message: "User has been successfully authenticated",
//                 sessionToken: token,
//               });
//             } else {
//               res.status(502).send({ error: "User sign in failed." });
//             }
//           }
//         );
//       } else {
//         res.status(500).send({ error: "Authentication failed." });
//       }
//     },
//     function (error) {
//       res.status(501).send({ error: "User sign in failed." });
//     }
//   );
// });

module.exports = router;
