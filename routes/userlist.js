var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({}, function(e, docs) {
        if (e)
            console.log(e)
        else
            res.render('userlist.html', { 'users': docs } );    
    });
    //res.render('userlist.html', { 'users':"user1" } );
});

module.exports = router;