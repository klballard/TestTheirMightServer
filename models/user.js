const { stringify } = require("querystring");
const sequelize = require("../db");
const DataTypes = require('sequelize');

    const UserModel = sequelize.define('user', {
        email: DataTypes.STRING,
        passwordhash: DataTypes.STRING 
    });

    module.exports = UserModel;