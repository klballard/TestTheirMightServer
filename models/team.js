const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const TeamModel = sequelize.define('team', {
        
        teamName: DataTypes.STRING,

        fighterOne: DataTypes.STRING,
        fighterOnePL: DataTypes.STRING,
        fighterOneImg: DataTypes.STRING,

        fighterTwo: DataTypes.STRING,
        fighterTwoPL: DataTypes.STRING,
        fighterTwoImg: DataTypes.STRING,

        fighterThree: DataTypes.STRING,
        fighterThreePL: DataTypes.STRING,
        fighterThreeImg: DataTypes.STRING,

        fighterFour: DataTypes.STRING,
        fighterFourPL: DataTypes.STRING,
        fighterFourImg: DataTypes.STRING,

        fighterFive: DataTypes.STRING,
        fighterFivePL: DataTypes.STRING,
        fighterFiveImg: DataTypes.STRING
});

module.exports = TeamModel;