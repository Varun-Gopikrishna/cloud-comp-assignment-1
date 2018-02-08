const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index');
})

app.get('/login', function (req, res) {
    res.render('login');
})

app.get('/signup', function (req, res) {
    res.render('signup');
})

app.get('/home', function (req, res) {
    res.render('home');
})

app.post('/login', function (req, res) {
    //If successful - res.render('home');
    if(req.body.username=="VarunG" && req.body.password=="varungpass"){
        res.render('home');
    }
    console.log(req.body.username);
    console.log(req.body.password);
})

app.post('/signup', function (req, res) {
     //If successful - res.render('home');
     if(req.body.username!="VarunG" && req.body.password!="varungpass"){
        res.render('home');
    }
    console.log(req.body.username);
    console.log(req.body.password);
})

app.listen(3000, function () {
  console.log('The App listening on port 3000...')
})
