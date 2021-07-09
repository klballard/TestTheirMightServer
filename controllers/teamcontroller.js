let Express = require('express');
let router = Express.Router();
let validateJWT = require('../middleware/validate-session');
//const { TeamModel } = require('../models/team');
let sequelize = require('../db');
const Sequelize = require('sequelize');
//const team = require('../models/team');
let TeamModel = require('../models/team')(sequelize, Sequelize);


//! Get all saved teams

router.get('/getall', validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const teamRoster = await TeamModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(teamRoster);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// router.get('/getall', function (req, res) {
//     var userId = req.user.id;

//     console.log('Getting all saved teams for the signed in user.')

//     TeamModel
//         .findAll({
//             where: { userId: userId }
//         })
//         .then(
//             function findAllSuccess(data) {
//                 res.json(data);
//                 console.log(data);
//             },
//             function findAllError(err) {
//                 res.send(500, err.message);
//             }
//         );
// });

// adding comment to force heroku
//! Save a team

router.post('/saveteam', validateJWT, async (req, res) => {
    const { teamId, teamName, fighterOne, fighterOnePL, fighterOneImg, fighterTwo, fighterTwoPL, fighterTwoImg, fighterThree, fighterThreePL, fighterThreeImg, fighterFour, fighterFourPL, fighterFourImg, fighterFive, fighterFivePL, fighterFiveImg} = req.body;
    const { id } = req.user;
    const teamCreate = {
        teamId, teamName,
        fighterOne, fighterOnePL, fighterOneImg,
        fighterTwo, fighterTwoPL, fighterTwoImg,
        fighterThree, fighterThreePL, fighterThreeImg,
        fighterFour, fighterFourPL, fighterFourImg,
        fighterFive, fighterFivePL, fighterFiveImg,
        userId: id
    }
    try {
        const newTeam = await TeamModel.create(teamCreate);
        res.status(200).json(newTeam);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    TeamModel.create(teamCreate)
});


// router.post('/saveteam', function(req, res) {
//     userId = req.user.id;
//     teamId = req.body.teamId;
//     teamName = req.body.teamName;

//     fighterOne = req.body.fighterOne;
//     fighterOnePL = req.body.fighterOnePL;
//     fighterOneImg = req.body.fighterOneImg;

//     fighterTwo = req.body.fighterTwo;
//     fighterTwoPL = req.body.fighterTwoPL;
//     fighterTwoImg = req.body.fighterTwoImg;

//     fighterThree = req.body.fighterThree;
//     fighterThreePL = req.body.fighterThreePL;
//     fighterThreeImg = req.body.fighterThreeImg;

//     fighterFour = req.body.fighterFour;
//     fighterFourPL = req.body.fighterFourPL;
//     fighterFourImg = req.body.fighterFourImg;

//     fighterFive = req.body.fighterFive;
//     fighterFivePL = req.body.fighterFivePL;
//     fighterFiveImg = req.body.fighterFiveImg;
    
//     TeamModel
//         .create({
//             userId : userId,
//             teamId : teamId,
//             teamName : teamName,

//             fighterOne : fighterOne,
//             fighterOnePL: fighterOnePL,
//             fighterOneImg : fighterOneImg,

//             fighterTwo : fighterTwo,
//             fighterTwoPL : fighterTwoPL,
//             fighterTwoImg : fighterTwoImg,

//             fighterThree : fighterThree,
//             fighterThreePL : fighterThreePL,
//             fighterThreeImg : fighterThreeImg,

//             fighterFour : fighterFour,
//             fighterFourPL : fighterFourPL,
//             fighterFourImg : fighterFourImg,

//             fighterFive : fighterFive,
//             fighterFivePL : fighterFivePL,
//             fighterFiveImg : fighterFiveImg
//         })
//         .then(
//             function createSuccess(team) {
//                 res.json({
//                     team: team
//                 });
//             },
//             function createError(err) {
//                 res.send(500, err.message);
//             }
//         );
// });

//! Delete a saved team
   
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

        await TeamModel.destroy(query);
        res.status(200).json({ message: 'Team disbanded.' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


// router.delete('/:id', function(req, res) {
//     var data = req.params.id;
//     var userId = req.user.id; 

//     TeamModel
//         .destroy({ 
//             where: { id: data, userId: userId }
//         }).then(
//             function deleteLogSuccess(data) { 
//                 res.send("You deleted a saved team.");
//             },
//             function deleteLogError(err) {
//                 res.send(500, err.message);
//             }
//         );
// });

//! Get a single team

router.get('/:id', function(req,res) {
    var data = req.params.id;
    console.log(data);
    var userId = req.user.id;

    TeamModel
        .findOne({
            where: {id: data, userId: userId}
        }).then(
            function findOneSuccess(data) {
                res.json(data);
                console.log(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        )
});

//! Edit a saved team

router.put(':/id', validateJWT, async (req, res) => {
    const { teamName } = req.body.teamName;
    const data = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: data,
            owner: userId
        }
    };

    const updatedTeam = {
        teamName: teamName
    };

    try{
        const update = await TeamModel.update(updatedTeam, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


// router.put('/:id', function(req, res) {
//     userId = req.user.id;
//     data = req.params.id;
//     teamId = req.body.teamId;
//     teamName = req.body.teamName;
    
//     fighterOne = req.body.fighterOne;
//     fighterOnePL = req.body.fighterOnePL;
//     fighterOneImg = req.body.fighterOneImg;

//     fighterTwo = req.body.fighterTwo;
//     fighterTwoPL = req.body.fighterTwoPL;
//     fighterTwoImg = req.body.fighterTwoImg;

//     fighterThree = req.body.fighterThree;
//     fighterThreePL = req.body.fighterThreePL;
//     fighterThreeImg = req.body.fighterThreeImg;

//     fighterFour = req.body.fighterFour;
//     fighterFourPL = req.body.fighterFourPL;
//     fighterFourImg = req.body.fighterFourImg;

//     fighterFive = req.body.fighterFive;
//     fighterFivePL = req.body.fighterFivePL;
//     fighterFiveImg = req.body.fighterFiveImg;
    
    
//     TeamModel
//         .update({
//             userId : userId,
//             teamId : teamId,
//             teamName : teamName,
            
//             fighterOne : fighterOne,
//             fighterOnePL: fighterOnePL,
//             fighterOneImg : fighterOneImg,

//             fighterTwo : fighterTwo,
//             fighterTwoPL : fighterTwoPL,
//             fighterTwoImg : fighterTwoImg,

//             fighterThree : fighterThree,
//             fighterThreePL : fighterThreePL,
//             fighterThreeImg : fighterThreeImg,

//             fighterFour : fighterFour,
//             fighterFourPL : fighterFourPL,
//             fighterFourImg : fighterFourImg,

//             fighterFive : fighterFive,
//             fighterFivePL : fighterFivePL,
//             fighterFiveImg : fighterFiveImg
            
//         },
//         {where: {id: data}}
//         ).then(
//             function updateSuccess(updatedTeam) { 
//                 res.json({
//                     data: updatedTeam
//                 });
//             },
//             function updateError(err){
//                 res.send(500, err.message);
//             }
//         )
// });



module.exports = router;