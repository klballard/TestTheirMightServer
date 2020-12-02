const DataTypes = require('sequelize');
const sequelize = require('../db');

const FighterModel = sequelize.define('fighter', {
    fighterName: DataTypes.STRING,
    intelligence: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    durability: DataTypes.INTEGER,
    power: DataTypes.INTEGER,
    combat: DataTypes.INTEGER,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER
});

module.exports = FighterModel;
