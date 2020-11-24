module.exports = function (sequelize, DataTypes) {

    return sequelize.define('team', {
        userId: DataTypes.NUMBER,
        teamId: DataTypes.NUMBER,
        teamName: DataTypes.STRING,
        fighterOne: DataTypes.STRING,
        fighterTwo: DataTypes.STRING,
        fighterThree: DataTypes.STRING,
        fighterFour: DataTypes.STRING,
        fighterFive: DataTypes.STRING
    });
    };