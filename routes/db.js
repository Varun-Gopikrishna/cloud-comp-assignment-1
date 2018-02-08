const{ Client} = require('pg')

const client = new Client({
    user: "mwxicccpdgvcnw",
    host: "ec2-54-243-59-122.compute-1.amazonaws.com",
    database: "do3o4vdfgfre3",
    password: "",
    port: "01d89d155ae1d02662cfd7eb90a997819640e31e762b41d57bdd3cecfc72a25e",
    ssl: true
});

client.connect();

client.on('error', (err,client)=>{
    console.error('Unexpected error on idle client',err);
    process.exit(-1);
});

//create the table
const table = 
    "CREATE TABLE IF NOT EXISTS users("+
    'uname VARCHAR(100) PRIMARY KEY,'+
    'password VARCHAR(100) NOT NULL);'+
    'CREATE TABLE IF NOT EXISTS reminders('+
    'id SERIAL PRIMARY KEY,'+
    'uname VARCHAR(100) NOT NULL,'+
    'date VARCHAR(25) NOT NULL,'+
    'remHead VARCHAR(200) NOT NULL,'+
    'remInfo VARCHAR(200) NOT NULL);';

client.query(table, (err,res)=>{
    if(err){
        console.log(err.stack);
    }
    else{
        console.log("|--TABLES CREATED--|")
    }

});

var addUser = function(data,callback){
    var sql = "INSERT INTO users(uname, password) values($1, $2)";
    var uValues = [data.userName, data.userPassword];
    client.query(sql, uValues, function(err,res){
        if (err){
            //console.error(err);
            if(err.code==23505){
                callback(-1);
            } else{
                callback(0);
            }
        }
        else{
            callback(1);
        }
    });
}




var getLogin = function(userName, callback){
    var sql = "SELECT uname, password FROM users WHERE uname=$1";
    var uValues = [userName];

    client.query(sql, uValues, function(err,res){
        if (err){
            callback(err);
        }
        else{
            if(res.rows.length ==0){
                callback(null);
            }
            else{
                callback(res.rows);
            }
        }
    });
}



var addRem = function(data, callback){
    var sql = "INSERT INTO reminders(uname, date remHead, remInfo) values($1,$2,$3,$4)";
    var uValues = [data.userName, data.remDate, data.head, data.content];

    client.query(sql, uValues, function(err,res){
      done();
      if (err){
        callback(0);
      }
      else{
        callback(1);
      }
    });
}

var delRem = function(id, callback){
    var sql = "DELETE FROM reminders WhERE id=$1";
    var uValues = [id];
    
    client.query(sql, uValues, function(err,res){
        if (err){
            callback(0);
        }
        else{
            callback(1);
          }
      
    });
}

var updateRemList = function(userID, userPassword, callback){
    var sql = "SELECT ID password";
    var uValues = [userID];
    var uPasses = [userPassword];

    client.query(sql, uValues, function(err,res){
      done();
      if (err){
           console.error(err);
      }
      else{
        if(res.rows.length ==0){
            callback(null);
        }
          else{
              callback(res.rows);
          }
      }
    });
}

}
    