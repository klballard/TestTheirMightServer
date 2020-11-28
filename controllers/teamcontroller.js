let router = require('express').Router();
const { Router } = require('express');
let sequelize = require('../db');
const Sequelize = require('sequelize');
const team = require('../models/team');
let TeamModel = require('../models/team')(sequelize, Sequelize);


//! Get all saved teams

router.get('/getall', function (req, res) {
    var userId = req.user.id;

    console.log('Getting all saved teams for the signed in user.')

    TeamModel
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


//! Save a team

router.post('/saveteam', function(req, res) {
    userId = req.body.userId;
    teamId = req.body.teamId;
    teamName = req.body.teamName;

    fighterOne = req.body.fighterOne;
    fighterOnePL = req.body.fighterOnePL;
    fighterOneImg = req.body.fighterOneImg;

    fighterTwo = req.body.fighterTwo;
    fighterTwoPL = req.body.fighterTwoPL;
    fighterTwoImg = req.body.fighterTwoImg;

    fighterThree = req.body.fighterThree;
    fighterThreePL = req.body.fighterThreePL;
    fighterThreeImg = req.body.fighterThreeImg;

    fighterFour = req.body.fighterFour;
    fighterFourPL = req.body.fighterFourPL;
    fighterFourImg = req.body.fighterFourImg;

    fighterFive = req.body.fighterFive;
    fighterFivePL = req.body.fighterFivePL;
    fighterFiveImg = req.body.fighterImg;
    
    TeamModel
        .create({
            userId : userId,
            teamId : teamId,
            teamName : teamName,

            fighterOne : fighterOne,
            fighterOnePL: fighterOnePL,
            fighterOneImg : fighterOneImg,

            fighterTwo : fighterTwo,
            fighterTwoPL : fighterTwoPL,
            fighterTwoImg : fighterTwoImg,

            fighterThree : fighterThree,
            fighterThreePL : fighterThreePL,
            fighterThreeImg : fighterThreeImg,

            fighterFour : fighterFour,
            fighterFourPL : fighterFourPL,
            fighterFourImg : fighterFourImg,

            fighterFive : fighterFive,
            fighterFivePL : fighterFivePL,
            fighterFiveImg : fighterFiveImg
        })
        .then(
            function createSuccess(data) {
                res.json({
                    responseLog: data
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

//! Delete a saved team
   
router.delete('/deleteteam', function(req, res) {
    var data = req.params.id;
    var teamId = req.team.id; 

    TeamModel
        .destroy({ 
            where: { id: data, teamId: teamId }
        }).then(
            function deleteLogSuccess(data) { 
                res.send("You deleted a saved team.");
            },
            function deleteLogError(err) {
                res.send(500, err.message);
            }
        );
});

/*
! Edit a saved team

router.put('/editteam', function(req, res) {
    var data = req.params.id;
//    var owner_id = req.user.id;
    var definition = req.body.definition;
    var description = req.body.description;
    var result = req.body.result;

    console.log('hello', req.body)
    TeamModel
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