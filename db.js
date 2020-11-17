//1
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    //host: 'localhost',  
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {   
        console.log('Connected to testtheirmight postgres database');
    },
    function(err){ 
        console.log(err);
    }
);

//User = sequelize.import('./models/user');
Fighter = sequelize.import('./models/fighter');
Team = sequelize.import('./models/team');

Fighter.belongsTo(Team);
                
module.exports = sequelize;

