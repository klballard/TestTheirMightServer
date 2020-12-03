module.exports = function (sequelize, DataTypes) {

    return sequelize.define('user', {
        email: DataTypes.STRING,
        passwordhash: DataTypes.STRING
        //isAdmin: DataTypes.BOOLEAN
    });
};
