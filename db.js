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

console.log('hello from db.js')

Fighter = sequelize.import('./models/fighter.js')
Team = sequelize.import('./models/team.js');

Fighter.belongsTo(Team);
Fighter.hasMany(Team);
Team.hasMany(Fighter);

        
module.exports = sequelize;

