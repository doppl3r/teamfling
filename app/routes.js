var User = require('./models/user');

module.exports = function(app, passport) {

    /* GET index */
    app.get('/', function(req, res) {
        console.log('index.html');
        res.render('index.html', {user : req.user} );
    });

    /* GET login */
    app.get('/login', function(req, res) {
        console.log('login.html');
        res.render('login.html', { message: req.flash('loginMessage')} );
    });
    
    /* POST to /login */
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash : true
    }));

    /* GET register */
    app.get('/register', isNotLoggedIn, function(req, res) {
        console.log('register.html');
        res.render('register.html', { message: req.flash('signupMessage')} );
    });

    // POST to register, process the signup form
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    // GET profile page, only if logged in
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.html', {
            user : req.user
        }); 
    });

    // POST profile page, only if logged in
    app.post('/profile', isLoggedIn, function(req, res) {
        User.update({ _id : { $eq : req.user._id }}).exec( function (err, result) {
            
        });
    });

    // GET logout, will log user out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // GET explore, will search through db for people, one at a time
    app.get('/explore', isLoggedIn, function(req, res) {
        //random select one from Users
        User.count().exec(function(err, count){
          var random = Math.ceil(Math.random() * count) % count;
          User.findOne({ _id : { $ne : req.user._id } })
              .skip(random).exec( function (err, result) {
                // result is random
                res.render('explore.html', { user: result } );
              });
        });
    });

    // GET event, will update users event field
    app.get('/event', isLoggedIn, function(req, res) {
        res.render('event.html');
    });

    // POST event, will update users event field
    app.post('/event', isLoggedIn, function(req, res) {
        User.update({ _id : { $eq : req.user._id } }, {'local.event' : req.param('event')}).exec( function (err, result) {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                console.log('Update successful');
                res.redirect('/profile');
            }
        });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// route middleware to make sure a logged in user can't access
function isNotLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    else
        return next();
    // if they are logged in, redirect them to the home page
}