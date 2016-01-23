var express = require('express'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    bodyParser = require('body-parser'),
    engines = require('consolidate'),
    mongodb = require('mongodb'),
    monk = require('monk'),
    db = monk('localhost:27017/grouper');


var routes = require('./routes/index.js');
var users = require('./routes/users.js');
var userlist = require('./routes/userlist.js');

var app = express();

// view engine setup
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static('./public'));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/userlist', userlist);

module.exports = app;
