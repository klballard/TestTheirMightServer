const { stringify } = require("querystring");

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('user', {
        email: DataTypes.STRING,
        passwordhash: DataTypes.STRING,
        role: DataTypes.STRING
    });
};
