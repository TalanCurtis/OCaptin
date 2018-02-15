require('dotenv').config();
const express = require('express'),
    cors = require('cors'),

    massive = require('massive'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0')

app = express()

// Destructuring .env
const { SERVER_PORT, SESSION_SECRET, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, CONNECTION_STRING } = process.env;

// Connect to Database
massive({ connectionString: CONNECTION_STRING }).then(db => app.set('db', db))

// Middleware imports
const bodyParser = require('body-parser'),
    session = require('express-session'),
    checkForSession = require('./middleware/checkForSession')

// Top Level Middleware
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
///////////////////////////
/// Swippity swap/////////////
// Avoid login with auth0 ////
// match object to req.user///
app.use((req, res, next) => {
    if (!req.session.user) {
        req.session.user = {
            user_id: 1,
            user_name: "testing",
            email: "B32alls@gmail.com",
            name: " ",
            profile_picture: "http://www.placekitten.com/200/250"
        }
    }
    next()
})
////////////////////////////////
app.use(passport.initialize());
app.use(passport.session());

// Setting up passport to use this "strategy"
// passport.use takes in a Contructor Function ({})
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    // this is what you get back from auth0 profile._json
    const { sub, name, picture } = profile._json;

    db.auth.find_user([sub]).then(dbResponse => {
        if (dbResponse[0]) {
            done(null, dbResponse[0].id)
        } else {
            // create a user and sends it back
            db.auth.create_user([name, picture, sub]).then(dbResponse => {
                done(null, dbResponse[0].id)
            })
        }
    });
}));
// serializeUser gets profile passed down from passport.authenticate done(profile)
passport.serializeUser((id, done) => {
    done(null, id)
});

// deserializeUser  req.user{}
passport.deserializeUser((id, done) => {
    const db = app.get('db');
    db.auth.find_logged_in_user([id]).then(dbResponse => {
        done(null, dbResponse[0])
    })
});

// Controller Imports
const tc = require('./controllers/test_controller');
const ac = require('./controllers/auth_controller');

//Endpoints
//// Test: it works.
app.get('/api/test', tc.testGet)

//// Auth 0 
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/home'
}))
//////// This enpoint checks to see if user is still loged in
///// put this check on component did mount to see if user still valid
app.get('/auth/me', (req, res) => {
    if (!req.user) {
        res.status(404).send('user not loged in')
    } else {
        res.status(200).send(req.user)
    }
})
// when login out if  you hit back chrome has cached your page. How do you stop?
// prevent browser from caching previos page.
app.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('http://localhost:3000/')
})

// Set Server to listen
app.listen(SERVER_PORT, () => (console.log(`Sailing on port: ${SERVER_PORT}`)))