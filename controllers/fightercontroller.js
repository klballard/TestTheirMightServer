let express = require('express');
let router = express.Router();
let sequelize = require('../db');
const Sequelize = require('sequelize');
let FighterModel = require('../models/fighter')(sequelize, Sequelize);


// Get all saved fighters

router.get('/getall', function (req, res) {
    var userId = req.user.id;

    console.log('Getting all saved fighters for the signed in user.')

    FighterModel
        .findAll({
            where: { userId: userId }
        })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

/*
!postman test for fighter POST
{
    "fighter":{
        "userId":1,
        "fighterName":"Test Man",
        "intelligence":100,
        "strength":100,
        "speed":100,
        "durability":100,
        "power":100,
        "combat":100,
        "image":"https://www.superherodb.com/pictures2/portraits/10/100/1204.jpg"
    }
}
*/

//! Get a single fighter

router.get('/:id', function(req,res) {
    var data = req.params.id;
    //var name = req.body.fighterName;
    var userId = req.user.id;

    FighterModel
        .findById({
            where: { id: data, userId: userId }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

//! Save a fighter

router.post('/save', function(req, res) {
    var userId = req.user.id;
    var fighterName = req.body.fighterName;
    var intelligence = req.body.intelligence;
    var strength = req.body.strength;
    var speed = req.body.speed;
    var durability = req.body.durability;
    var power = req.body.power;
    var combat = req.body.combat;
    var image = req.body.image;

    FighterModel
        .create({
            userId: userId,
            fighterName : fighterName,
            intelligence : intelligence,
            strength : strength,
            speed : speed,
            durability : durability,
            power : power,
            combat : combat,
            image: image
        })
        .then(
            function createSuccess(fighter) {
                res.json({
                    fighter: fighter
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

//! Delete a saved fighter
   
router.delete('/:id', function(req, res) {
    var data = req.params.id;
    var userId = req.user.id; 

    FighterModel
        .destroy({ 
            where: { id: data, userId: userId }
        }).then(
            function deleteFighterSuccess(data) { 
                res.send("You deleted a saved fighter.");
            },
            function deleteFighterError(err) {
                res.send(500, err.message);
            }
        );
});

/*
! Edit a saved fighter (admin feature)

router.put('/', function(req, res) {
    var data = req.params.id;
//    var owner_id = req.user.id;
    var definition = req.body.definition;
    var description = req.body.description;
    var result = req.body.result;

    console.log('hello', req.body)
    FighterModel
        .update({
            description: description,
            definition: definition,
            result: result,
        },
        {where: {id: data}}
        ).then(
            function updateSuccess(updatedLog) { 
                res.json({
                    data: updatedLog
                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});
*/


module.exports = router;