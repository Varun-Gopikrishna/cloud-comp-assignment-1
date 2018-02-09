var express = require('express');
var router = express.Router();

const {
    Client
} = require('pg')

const client = new Client({
    user: "mwxicccpdgvcnw",
    host: "ec2-54-243-59-122.compute-1.amazonaws.com",
    database: "do3o4vdfgfre3",
    password: "01d89d155ae1d02662cfd7eb90a997819640e31e762b41d57bdd3cecfc72a25e",
    port: "5432",
    ssl: true
});

client.connect();

client.on('error', (err,client)=>{
    console.error('Unexpected error on idle client',err);
    process.exit(-1);
});

var user = "";

//create the table
const table = 
    "CREATE TABLE IF NOT EXISTS users("+
    'uname VARCHAR(100) PRIMARY KEY,'+
    'password VARCHAR(100) NOT NULL);'+
    'CREATE TABLE IF NOT EXISTS reminders('+
    'id SERIAL PRIMARY KEY,'+
    'uname VARCHAR(100) NOT NULL,'+
    'date VARCHAR(25) NOT NULL,'+
    'remInfo VARCHAR(200) NOT NULL);';

client.query(table, (err,res)=>{
    if(err){
        console.log(err.stack);
    }
    else{
        console.log("|--TABLES CREATED--|")
    }

});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
    res.render('login');
})

router.post('/loginuser', function(req, res) {

    var username = req.body.username;
    var password =req.body.password;

    var sql = "SELECT uname, password FROM users WHERE uname=$1";
    var uValues = [username];

    client.query(sql, uValues, function(err,result){
        if (err){
            res.redirect('/login?err=error');
        }
        else{
            if(result.rows.length ==0){
                console.log('User not found');
                res.redirect('/login?err=error');
            }
            else{
                //console.log('Login Successful')
                res.redirect('/home')
                user = username;
            }
        }
    });
})

router.get('/signup', function(req, res) {
    res.render('signup');    
})

router.post('/signup', function(req, res) {
    var username = req.body.username;
    var password =req.body.password;

    var sql = "INSERT INTO users(uname, password) values($1, $2)";
    var uValues = [username, password];
    
    client.query(sql, uValues, function(err,result){
        if (err){
            res.redirect("signup?err=error");
        }
        else{
            //console.log('Sign up successful');
            res.redirect('home');
            user = username;
        }
    });
});


router.get('/home', function(req, res) {
    var sql = "SELECT * FROM reminders";
        client.query(sql)
        .then(result => {
            //console.log('Displaying reminders')
            rem_data = JSON.stringify(result.rows);
            rem_data = JSON.parse(rem_data);

            res.render('home', {data: rem_data});
        }).catch(err => {
            console.log(err);
            res.redirect("home?err=error");
        });
})

router.post('/home', function(req, res) {
    if(user != ''){
        var remDate = req.body.remDate;
        var remInfo = req.body.remDesc;


        var sql = "INSERT INTO reminders(uname, date, remInfo) values($1,$2,$3)";
        
        var uValues = [user, remDate, remInfo];


        client.query(sql, uValues)
        .then(result => {
            //console.log('Added Reminder');
            res.redirect('home');
        }).catch(err => {
            console.log(err);
            res.redirect("home?err=error");
        });
    } else {
        console.log("No user");
        res.redirect("home?err=error");
    }
})

router.post('/delete', function(req, res){
    
    var id = req.body.id;
    var uValues = [id];

    var sql = "DELETE FROM reminders WHERE id=$1";  
    
    client.query(sql, uValues, function(err,result){
        if (err){
            res.redirect('home');
        }
        else{
            res.redirect('home');
          }
      
    });

})

router.post('/newnote', function(req, res) {
    res.render('newnote');
})

router.get('/addnote', function(req, res) {
    res.render('home');
})




module.exports = router;