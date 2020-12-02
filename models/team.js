const DataTypes = require('sequelize');
const sequelize = require('../db');

const TeamModel = sequelize.define('team', {
        userId: DataTypes.INTEGER,
        teamId: DataTypes.INTEGER,
        teamName: DataTypes.STRING,

        fighterOne: DataTypes.STRING,
        fighterOnePL: DataTypes.INTEGER,
        fighterOneImg: DataTypes.STRING,

        fighterTwo: DataTypes.STRING,
        fighterTwoPL: DataTypes.INTEGER,
        fighterTwoImg: DataTypes.STRING,

        fighterThree: DataTypes.STRING,
        fighterThreePL: DataTypes.INTEGER,
        fighterThreeImg: DataTypes.STRING,

        fighterFour: DataTypes.STRING,
        fighterFourPL: DataTypes.INTEGER,
        fighterFourImg: DataTypes.STRING,

        fighterFive: DataTypes.STRING,
        fighterFivePL: DataTypes.INTEGER,
        fighterFiveImg: DataTypes.STRING
});

module.exports = TeamModel;