module.exports = function (sequelize, DataTypes) {

return sequelize.define('fighter', {
    charId: DataTypes.INTEGER,
    charName: DataTypes.STRING,
    intelligence: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    durability: DataTypes.INTEGER,
    power: DataTypes.INTEGER,
    combat: DataTypes.INTEGER,
    image: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
});
};