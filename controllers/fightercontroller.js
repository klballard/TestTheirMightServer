let Express = require('express');
let router = Express.Router();
let validateJWT = require('../middleware/validate-session');
//const { FighterModel } = require('../models/fighter');
let sequelize = require('../db');
const Sequelize = require('sequelize');
let FighterModel = require('../models/fighter')(sequelize, Sequelize);

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

//! Get all saved fighters

router.get('/getall', validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const fighterRoster = await FighterModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(fighterRoster);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// router.get('/getall', function (req, res) {
//     var userId = req.user.id;

//     console.log('Getting all saved fighters for the signed in user.')

//     FighterModel
//         .findAll({
//             where: { userId: userId }
//         })
//         .then(
//             function findAllSuccess(data) {
//                 res.json(data);
//             },
//             function findAllError(err) {
//                 res.send(500, err.message);
//             }
//         );
// });


//! Get a single fighter

router.get('/:id', function(req,res) {
    var data = req.params.id;
    //var name = req.body.fighterName;
    var userId = req.user.id;

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

router.post('/save', validateJWT, async (req, res) => {
    const { fighterName, intelligence, strength, speed, durability, power, combat, image } = req.body;
    const { id } = req.user;
    const fighterCreate = {
        fighterName,
        intelligence,
        strength,
        speed,
        durability,
        power,
        combat,
        image,
        userId: id
    } 
    try {
        const newFighter = await FighterModel.create(fighterCreate);
        res.status(200).json(newFighter);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    FighterModel.create(fighterCreate)
});


// router.post('/save', function(req, res) {
//     var userId = req.user.id;
//     var fighterName = req.body.fighterName;
//     var intelligence = req.body.intelligence;
//     var strength = req.body.strength;
//     var speed = req.body.speed;
//     var durability = req.body.durability;
//     var power = req.body.power;
//     var combat = req.body.combat;
//     var image = req.body.image;

//     FighterModel
//         .create({
//             userId: userId,
//             fighterName : fighterName,
//             intelligence : intelligence,
//             strength : strength,
//             speed : speed,
//             durability : durability,
//             power : power,
//             combat : combat,
//             image: image
//         })
//         .then(
//             function createSuccess(fighter) {
//                 res.json({
//                     fighter: fighter
//                 });
//             },
//             function createError(err) {
//                 res.send(500, err.message);
//             }
//         );
// });

//! Delete a saved fighter
   
router.delete('/:id', validateJWT, async (req, res) => {
    const userId = req.user.id;
    const data = req.params.id;

    try {
        const query = {
            where: {
                id: data,
                owner: userId
            }
        };

        await FighterModel.destroy(query);
        res.status(200).json({ message: 'Fighter removed.' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


// router.delete('/:id', function(req, res) {
//     var data = req.params.id;
//     var userId = req.user.id; 

//     FighterModel
//         .destroy({ 
//             where: { id: data, userId: userId }
//         }).then(
//             function deleteFighterSuccess(data) { 
//                 res.send("You deleted a saved fighter.");
//             },
//             function deleteFighterError(err) {
//                 res.send(500, err.message);
//             }
//         );
// });


//! Edit a saved fighter

router.put('/:id', validateJWT, async (req, res) => {
    const { fighterName } = req.body.fighterName;
    const data = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: data,
            owner: userId
        }
    };

    const updatedFighter = {
        fighterName: fighterName
    };

    try {
        const update = await FighterModel.update(updatedFighter, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// router.put('/:id', function(req, res) {
//     var data = req.params.id;
//     var userId = req.user.id;
//     var fighterName = req.body.fighterName
    
//     FighterModel
//         .update({
//             fighterName : fighterName
//         },
//         {where: {id: data}}
//         ).then(
//             function updateSuccess(updatedFighter) { 
//                 res.json({
//                     data: updatedFighter
//                 });
//             },
//             function updateError(err){
//                 res.send(500, err.message);
//             }
//         )
// });



module.exports = router;