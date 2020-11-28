
module.exports = function (sequelize, DataTypes) {

return sequelize.define('fighter', {
    fighterName: DataTypes.STRING,
    intelligence: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    durability: DataTypes.INTEGER,
    power: DataTypes.INTEGER,
    combat: DataTypes.INTEGER,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER//,
//    teamId: INTEGER
});
};