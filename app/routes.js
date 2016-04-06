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
        console.log('params');        
        console.log(req.params);
        console.log('body');        
        console.log(req.body);
        console.log('query');
        console.log(req.query);
        console.log('user');
        console.log(req.user);
      
        //If they dont update on first time, description will = ''
        var username = req.body.username;
        var description = req.body.description;
        var roles = req.body.role;
        
        //If roles is only 1 string, make it an array
        if ( !Array.isArray(roles) )
            roles = roles.split();

        //Update user profile
        User.update(
            { _id : { $eq : req.user._id } }, 
            { 'local.username' : username,
             'local.description' : description,
             //Will add the NULL value to role if they don't select a role
             '$addToSet' : { 'local.role' : { '$each' : roles } } } ).exec( function (err, result) {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                console.log('Profile update');
                res.redirect('/event');
            }
        });
    
    });

    // GET logout, will log user out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // GET explore, will search through db for people, one at a time
    app.get('/explore', isLoggedIn, function(req, res) {
        console.log('DEBUG - ' + req.user);
        
        var event = req.user.local.event;
        console.log('event were looking for -- ' + event);
//random select one from Users
        User.find({'local.event' : event}).count().exec(function(err, count){
          console.log('Number of people -- ' + count);
          //var random = (Math.floor ( ( Math.random() * count ) / 2 ) + 1 ) % count;
          User.findOne({ _id : { $ne : req.user._id }, 'local.event' : event })
              //.skip(random)
              .exec( function (err, result) {
                // result is random
                res.render('explore.html', { user: result, myself: req.user } );
              });
        });
    });

    // POST explore, will set a ticker on another person saying you want to meet
    app.post('/explore', isLoggedIn, function(req, res) {
        console.log('Showed interested in -- ' + req.body.username);
        
        console.log('Nothing actually happens');
    });

    // GET event, will update users event field
    app.get('/event', isLoggedIn, function(req, res) {
        res.render('event.html');
    });

    // POST event, will update users event field
    app.post('/event', isLoggedIn, function(req, res) {
        User.update({ _id : { $eq : req.user._id } }, {'local.event' : req.body.eventname}).exec( function (err, result) {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                console.log('Update successful');
                res.redirect('/explore');
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