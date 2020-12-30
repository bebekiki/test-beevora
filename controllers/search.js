const mysql = require('mysql');

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//connexion à la BD
db.connect();

exports.etage = function(req,res){
    db.query("SELECT * FROM parking WHERE etage=? AND user IS NULL", [req.body.etage], function(err,result){
        if(err){
            return res.json({
                "error": true,
                "data": err.message
            })
        }else{
            return res.json({
                "error": false,
                "data": result
            })
        }
    })
}

exports.user = function(req,res){
    db.query('SELECT * FROM parking WHERE user=?', [req.body.user], function(err,result){
        if(err){
            return res.json({
                "error": true,
                "data": err.message
            })
        }else{
            return res.json({
                "error": false,
                "data": result
            })
        }
    })
}
