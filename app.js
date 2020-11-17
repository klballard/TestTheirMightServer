require('dotenv').config();
var express = require('express');
var app = express();
var sequelize = require('./db');
var user = require('./controllers/usercontroller');
//var fighter = require('./controllers/fightercontroller');
//var team = require('./controllers/teamcontroller');


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