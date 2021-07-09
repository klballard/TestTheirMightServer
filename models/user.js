
const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    passwordhash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type?: DataTypes.BOOLEAN,
    },
});

module.exports = User;


// module.exports = function (sequelize, DataTypes) {

//     return sequelize.define('user', {
//         email: DataTypes.STRING,
//         passwordhash: DataTypes.STRING,
//         isAdmin: DataTypes.BOOLEAN
//     });
// };
