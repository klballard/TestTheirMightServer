var router = require('express').Router();
const { Router } = require('express');
var sequelize = require('../db');
var TeamModel = sequelize.import('../models/team');


//! Get all saved teams

router.get('/getallteam', function (req, res) {
    var ownerId = req.user.id;

    console.log('Getting all saved teams for the signed in user.')

    TeamModel
        .findAll({
            where: { ownerId: ownerId }
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
    var ownerId = req.user.id;
    teamName = req.body.teamName;
    charName = req.body.charName;
    charId = re.body.charId;
    
    TeamModel
        .create({
            ownerId: ownerId,
            teamName: teamName,
            charName: charName,
            charId: charId 

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
    var ownerId = req.user.id; 

    TeamModel
        .destroy({ 
            where: { id: data, ownerId: ownerId }
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