const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");    
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/temanibu-api', {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to TemanIbu application. Take notes quickly. Organize and keep track of all your notes."});
});

// Require news routes
require('./app/routes/news.routes.js')(app);

// Require promo routes
require('./app/routes/promo.routes.js')(app);


// listen for requests
// app.listen(9000, () => {
//     console.log("Server is listening on port 9000");
// }); 
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log("Server is listening on port 9000");
}); 