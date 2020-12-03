
const { Router } = require('express');
//let express = require('express');
//let router = express.Router();
let sequelize = require('../db');
const Sequelize = require('sequelize');
const {FighterModel} = require('../models');

const router = Router();

// Get all saved fighters

router.get('/getall', function (req, res) {
    let userId = req.user.id;

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
    let data = req.params.id;
    //var name = req.body.fighterName;
    let userId = req.user.id;

    FighterModel
        .findOne({
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
    console.log(req.users);
    let userId = req.user.id;
    let fighterName = req.body.fighter.fighterName;
    let intelligence = req.body.fighter.intelligence;
    let strength = req.body.fighter.strength;
    let speed = req.body.fighter.speed;
    let durability = req.body.fighter.durability;
    let power = req.body.fighter.power;
    let combat = req.body.fighter.combat;
    let image = req.body.fighter.image;

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
                console.log(err, 'right HERE')
                res.send(500, err.message);
            }
        );
});

//! Delete a saved fighter
   
router.delete('/:id', function(req, res) {
    let data = req.params.id;
    let userId = req.user.id; 

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


//! Edit a saved fighter

router.put('/:id', function(req, res) {
    let data = req.params.id;
    let userId = req.user.id;
    let fighterName = req.body.fighter.fighterName
    
    FighterModel
        .update({
            fighterName : fighterName
        },
        {where: {id: data}}
        ).then(
            function updateSuccess(updatedFighter) { 
                res.json({
                    data: updatedFighter
                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});



module.exports = router;