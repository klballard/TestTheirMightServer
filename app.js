require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let user = require('./controllers/usercontroller');
//var fighter = require('./controllers/fightercontroller');
//var team = require('./controllers/teamcontroller');

console.log('hello again')
sequelize.sync(); 

app.use(express.json());
app.use(require('./middleware/headers')); 
app.use('/user', user);
//app.use(require('./middleware/validate-session'));
//app.use('/fighter', fighter);
//pp.use('/team', team);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
    console.log(process.env.DATABASE_URL)
})