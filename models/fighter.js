const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const FighterModel = sequelize.define('fighter', {
    fighterName: DataTypes.STRING,
    intelligence: DataTypes.STRING,
    strength: DataTypes.STRING,
    speed: DataTypes.STRING,
    durability: DataTypes.STRING,
    power: DataTypes.STRING,
    combat: DataTypes.STRING,
    image: DataTypes.STRING,
    
});

module.exports = FighterModel;
