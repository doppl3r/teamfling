// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

//load up db
var User = require('../app/models/user');


// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('signup', new LocalStrategy({
        // by default, local strategy uses username and password
        //usernameField : 'email',
        //passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err) {
                console.log('Error in SignUp: '+err);
                return done(err);
            }

            // check to see if theres already a user with that email
            if (user) {
                console.log('User already exists');
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's credentials
                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.firstname = req.param('firstname');
                newUser.local.lastname = req.param('lastname');
                newUser.local.role = req.param('role');
                newUser.local.description = req.param('description');

                // save the user
                newUser.save(function(err) {
                    if (err) {
                        console.log('Error in Saving user: '+err);  
                        throw err;
                    }
                    console.log('User registration successful');
                    return done(null, newUser);
                });
            }

        });

        }); //process.tick

    }));

};
