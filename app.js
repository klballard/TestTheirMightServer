require('dotenv').config();
const Express = require('express');
//const cors = require('cors');
const app = Express();
const dbConnection = require('./db');

app.use(require('./middleware/headers')); 
const controllers = require('./controllers');
app.use(Express.json());

//app.use(cors());

app.use('/user', controllers.userController);
app.use(require('./middleware/validate-session'));

//app.options('/fighter', cors());
app.use('/fighter', controllers.fighterController);

//app.options('/team', cors());
app.use('/team', controllers.teamController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on port ${process.env.PORT}`)
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    });


// app.listen(process.env.PORT, () => {
//     console.log(`Server is listening on port ${process.env.PORT}`)
//     console.log(process.env.DATABASE_URL)
// })