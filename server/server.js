require('dotenv').config();
const express = require('express'),
    cors = require('cors'),
    session = require('express-session'),
    massive = require('massive'),

    app = express()

// Destructuring .env
const { SERVER_PORT , CONNECTION_STRING} = process.env;

// Connect to Database
massive({connectionString: CONNECTION_STRING}).then(db=>app.set('db', db))

// Middleware imports
const bodyParser = require('body-parser');

// Top Level Middleware
app.use(bodyParser.json());

// Controller Imports
const tc = require('./controllers/test_controller');

//Endpoints
//// Test: it works.
app.get('/api/test', tc.testGet)


// Set Server to listen
app.listen(SERVER_PORT, () => (console.log(`Sailing on port: ${SERVER_PORT}`)))