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
sequelize.authenticate().then(
    function() {   
        console.log('Connected to testtheirmight postgres database');
    },
    function(err){ 
        console.log(err);
    }
);
console.log('hi')

Fighter = require('./models/fighter')(sequelize, Sequelize);
Team = require('./models/team')(sequelize, Sequelize);

Fighter.belongsTo(Team);
Fighter.hasMany(Team);
Team.hasMany(Fighter);
        
module.exports = sequelize;

