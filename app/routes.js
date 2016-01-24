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
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash : true
    }));

    /* GET register */
    app.get('/register', function(req, res) {
        console.log('register.html');
        res.render('register.html', { message: req.flash('signupMessage')} );
    });

    // process the signup form
    app.post('/register', passport.authenticate('signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.html', {
            user : req.user
        }); 
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
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