//DATABASE_URL=postgresql://postgres:c00ki3s@localhost/TestTheirMight
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'localhost',
    dialect: "postgres"
});
/*
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
});
*/

        
module.exports = sequelize;

