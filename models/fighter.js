
module.exports = function (sequelize, DataTypes) {

return sequelize.define('fighter', {
    fighterName: DataTypes.STRING,
    intelligence: DataTypes.NUMBER,
    strength: DataTypes.NUMBER,
    speed: DataTypes.NUMBER,
    durability: DataTypes.NUMBER,
    power: DataTypes.NUMBER,
    combat: DataTypes.NUMBER,
    image: DataTypes.STRING,
    userId: DataTypes.NUMBER,
    teamId: NUMBER
});
};