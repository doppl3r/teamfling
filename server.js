var express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    engines = require('consolidate'),
    mongoose = require('mongoose'),
    morgan = require('morgan');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

var app = express();

// pass passport for configuration
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


// view engine setup
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', './views');

app.use(express.static('./public'));

// required for passport
app.use(session({ secret: 'mysecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//load routes and pass in our app, and passport
require('./app/routes.js')(app, passport);

module.exports = app;
