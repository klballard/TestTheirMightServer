//DATABASE_URL=postgresql://postgres:c00ki3s@localhost/TestTheirMight
const Sequelize = require('sequelize');

const sequelize = new Sequelize('testtheirmightLOCAL2', 'postgres' ,'c00ki3s', {
    host: 'localhost',
    dialect: "postgres"
});
/*
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    'testtheirmightLOCAL2', 'postgres' ,'c00ki3s'
    dialect: "postgres"
});
*/

        
module.exports = sequelize;

