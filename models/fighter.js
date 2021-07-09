
// const { DataTypes } = require('sequelize');
// const db = require('../db');

// const Fighter = db.define('fighter', {
//     fighterName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     intelligence: {
//         type: DataTypes.INTEGER,
//     },
//     strength: {
//         type: DataTypes.INTEGER,
//     },
//     speed: {
//         type: DataTypes.INTEGER,
//     },
//     durability: {
//         type: DataTypes.INTEGER,
//     },
//     power: {
//         type: DataTypes.INTEGER,
//     },
//     combat: {
//         type: DataTypes.INTEGER,
//     },
//     image: {
//         type: DataTypes.STRING,
//     },
//     userId: {
//         type: DataTypes.INTEGER,
//     },
// });

// module.exports = Fighter;



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
         userId: DataTypes.INTEGER,
     //    teamId: INTEGER
     });
     };
    