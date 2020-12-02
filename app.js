require('dotenv').config();
let express = require('express');
//let cors = require('cors');
let app = express();
let sequelize = require('./db');
let user = require('./controllers/usercontroller');
let fighter = require('./controllers/fightercontroller');
let team = require('./controllers/teamcontroller');


app.use(express.json());
//app.use(cors());
app.use(require('./middleware/headers')); 
app.use('/user', user);
app.use(require('./middleware/validate-session'));
//app.options('/fighter', cors());
app.use('/fighter', fighter);
//app.options('/team', cors());
app.use('/team', team);


sequelize.authenticate()
.then(() => sequelize.sync({force:true}))
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`)
        console.log(process.env.DATABASE_URL)
    })
}).catch((err) => {
    console.log(err, 'server crash');
})
