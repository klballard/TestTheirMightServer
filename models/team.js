    const { DataTypes } = require('sequelize');
    const db = require('../db');
    
    const Team = db.define('team', {
        userId:{
            type: DataTypes.INTEGER,
        },
        teamId: {
            type: DataTypes.INTEGER,
        },
        teamName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        fighterOne: {
            type: DataTypes.STRING,
        },
        fighterOnePL: {
            type: DataTypes.INTEGER,
        },
        fighterOneImg: {
            type: DataTypes.STRING,
        },
        fighterTwo: {
            type: DataTypes.STRING,
        },
        fighterTwoPL: {
            type: DataTypes.INTEGER,
        },
        fighterTwoImg: {
            type: DataTypes.STRING,
        },
        fighterThree: {
            type: DataTypes.STRING,
        },
        fighterThreePL: {
            type: DataTypes.INTEGER,
        },
        fighterThreeImg: {
            type: DataTypes.STRING,
        },
        fighterFour: {
            type: DataTypes.STRING,
        },
        fighterFourPL: {
            type: DataTypes.INTEGER,
        },
        fighterFourImg: {
            type: DataTypes.STRING,
        },
        fighterFive: {
            type: DataTypes.STRING,
        },
        fighterFivePL: {
            type: DataTypes.INTEGER,
        },
        fighterFiveImg: {
            type: DataTypes.STRING,
        },
    });

    module.exports = Team;


    // module.exports = function (sequelize, DataTypes) {

    //     return sequelize.define('team', {
    //         userId: DataTypes.INTEGER,
    //         teamId: DataTypes.INTEGER,
    //         teamName: DataTypes.STRING,
    
    //         fighterOne: DataTypes.STRING,
    //         fighterOnePL: DataTypes.INTEGER,
    //         fighterOneImg: DataTypes.STRING,
    
    //         fighterTwo: DataTypes.STRING,
    //         fighterTwoPL: DataTypes.INTEGER,
    //         fighterTwoImg: DataTypes.STRING,
    
    //         fighterThree: DataTypes.STRING,
    //         fighterThreePL: DataTypes.INTEGER,
    //         fighterThreeImg: DataTypes.STRING,
    
    //         fighterFour: DataTypes.STRING,
    //         fighterFourPL: DataTypes.INTEGER,
    //         fighterFourImg: DataTypes.STRING,
    
    //         fighterFive: DataTypes.STRING,
    //         fighterFivePL: DataTypes.INTEGER,
    //         fighterFiveImg: DataTypes.STRING
    //     });
    //     };
    