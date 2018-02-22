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
// match object to req.user the wherever you use req.user you can use req.session.user then replace///
app.use((req, res, next) => {
    if (!req.session.user) {
        req.session.user = {
            id: 16,
            role: 'teacher',
            user_name: "Testy",
            first_name: "Testy",
            last_name: "McTesterson",
            email: "Testies@gmail.com",
            img: "http://www.placekitten.com/200/250"
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
    const { sub, name, picture, given_name, family_name } = profile._json;
    console.log('test')

    db.auth.find_user([sub]).then(dbResponse => {
        if (dbResponse[0]) {
            console.log('test')
            done(null, dbResponse[0].id)
        } else {
            // create a user and sends it back
            db.auth.create_user([name, picture, sub, given_name, family_name]).then(dbResponse => {
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
/// switch req.session.user <> req.user
app.get('/auth/me', (req, res) => {
    if (!req.session.user) {
        res.status(404).send({})
        // return res.redirect('http://localhost:3000/')
    } else {
        res.status(200).send(req.session.user)
    }
})
// when login out if  you hit back chrome has cached your page. How do you stop?
// prevent browser from caching previos page.
app.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('http://localhost:3000/')
})

// Teacher Endpoints
/// not being used currently
app.get('/api/classes/:id', (req, res, next) => {
    console.log('classes endpoint hit')
    let id = req.params.id;
    // go get db info
    const db = app.get('db');
    db.getInfo.get_all_classes([id]).then(dbResponse => {
        // return that info
        res.status(200).send(dbResponse)
    })
})

/// Not being used currently
app.get('/api/class/:id', (req, res, next) => {
    // making two db hits one for students and another for 
    // assignments sending both back in one response.
    console.log('class endpoint hit')
    let id = req.params.id;
    const db = app.get('db');
    db.getInfo.get_students_in_class([id]).then(students => {
        // return that info
        db.getInfo.get_assignments_in_class([id]).then(assignments => {
            let combine = [students, assignments]
            res.status(200).send(combine)
        })
    })
})

app.get('/api/home/:id', (req, res, next) => {
    console.log('classes endpoint hit')
    let id = req.params.id;
    // go get db info
    const db = app.get('db');
    db.getInfo.get_all_for_teacher([id]).then(dbResponse => {
        // return that info
        res.status(200).send(dbResponse)
    })
})

app.put('/api/edit/assignment/:id', (req, res, next) => {
    console.log('edit assignment hit with id: ', req.params.id)
    console.log('req. body', req.body)
    const { id, name, scoreMax } = req.body
    const db = app.get('db');
    db.edit.edit_test([id , name, scoreMax]).then(dbResponse => {
        res.status(200).send(dbResponse)
    })

})

// Set Server to listen
app.listen(SERVER_PORT, () => (console.log(`Sailing on port: ${SERVER_PORT}`)))