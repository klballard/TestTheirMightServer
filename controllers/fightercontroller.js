let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let FighterModel = sequelize.import('../models/fighter');


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
        "charId":1000,
        "charName":"Test Man",
        "intelligence":100,
        "strength":100,
        "speed":100,
        "durability":100,
        "power":100,
        "combat":100,
        "ownerId":1
    }
}
*/
//! Save a fighter

router.post('/save', function(req, res) {
    var userId = req.user.id;
    var fighterId = req.body.fighter.charId;
    var fighterName = req.body.fighter.charName;
    var int = req.body.fighter.intelligence;
    var str = req.body.fighter.strength;
    var spd = req.body.fighter.speed;
    var dur = req.body.fighter.durability;
    var pow = req.body.fighter.power;
    var com = req.body.fighter.combat;
    var image = req.body.fighter.image;

    FighterModel
        .create({
            userId: userId,
            fighterId : fighterId,
            fighterName : fighterName,
            intelligence : int,
            strength : str,
            speed : spd,
            durability : dur,
            power : pow,
            combat : com,
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
   
router.delete('/delete', function(req, res) {
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