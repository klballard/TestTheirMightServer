//DATABASE_URL=postgresql://postgres:c00ki3s@localhost/TestTheirMight
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
});

sequelize.authenticate().then(
    function() {   
        console.log('Connected to testtheirmight postgres database');
    },
    function(err){ 
        console.log(err);
    }
);
console.log('hi')
/*
User = sequelize.import('./models/user');
Fighter = sequelize.import('./models/fighter');
Team = sequelize.import('./models/team');

Fighter.belongsTo(Team);
*/        
module.exports = sequelize;

