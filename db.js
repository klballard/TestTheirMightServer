//DATABASE_URL=postgresql://postgres:c00ki3s@localhost/TestTheirMight
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'localhost',
    dialect: "postgres"
});
/*                         
"testtheirmightserver", "postgres", "c00kies",
process.env.DATABASE_URL   
*/
sequelize.authenticate().then(
    () => {
        console.log('Connection has been established.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

console.log('hi')

Fighter = require('./models/fighter')(sequelize, Sequelize);
Team = require('./models/team')(sequelize, Sequelize);

Fighter.belongsTo(Team);
Fighter.hasMany(Team);
Team.hasMany(Fighter);

        
module.exports = { app, sequelize };

