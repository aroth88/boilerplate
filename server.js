const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const passport = require('passport');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({db:db});
dbStore.sync();

const app = express();



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// you'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, './public')))
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser((user, done) => {
    try {
      done(null, user.id);
    } catch (err) {
      done(err);
    }
});
  
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(done);
});


// Any routes or other various middlewares should go here!
app.use(session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false
}));
// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
app.use('/api', require('./api')); // matches all requests to /api

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});



module.exports = app;