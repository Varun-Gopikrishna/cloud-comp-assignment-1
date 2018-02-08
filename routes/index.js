var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
    res.render('login');
})

router.get('/signup', function(req, res) {
    res.render('signup');
})

router.get('/home', function(req, res) {
    res.render('home');
})

router.post('/login', function(req, res) {
    //If successful - res.render('home');
    if (req.body.username == "VarunG" && req.body.password == "varungpass") {
        res.render('home');
    }
    console.log(req.body.username);
    console.log(req.body.password);
})

router.post('/signup', function(req, res) {
    //If successful - res.render('home');
    if (req.body.username != "VarunG" && req.body.password != "varungpass") {
        res.render('home');
    }
    console.log(req.body.username);
    console.log(req.body.password);
})

module.exports = router;