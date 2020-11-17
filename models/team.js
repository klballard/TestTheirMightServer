module.exports = function (sequelize, DataTypes) {

    return sequelize.define('team', {
        ownerId: DataTypes.INTEGER,
        teamName: DataTypes.STRING,
        charId: DataTypes.INTEGER,
        charName: DataTypes.STRING
    });
    };