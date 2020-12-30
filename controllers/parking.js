const mysql = require('mysql');

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//connexion à la BD
db.connect();

exports.create = function(req,res){
    const numPlace = req.body.numPlace;
    const etage = req.body.etage;
    const disponibilite = req.body.disponibilite;
    const tempsOccupation = req.body.tempsOccupation
   
    db.query('INSERT INTO parking(numPlace, etage, disponibilite, tempsOccupation) VALUES(?,?,?,?)',[numPlace,etage,disponibilite,tempsOccupation],(err,results)=>{
        if(err){
            return res.json({
                "error":true,
                "message": "La création a échouée, veuillez réessayer"
            })
        }else{
            return res.json({
                "error":false,
                "message": "Parking cré avec succès "
            })
        }
    });
}

exports.assign = function(req,res){
    db.query('UPDATE parking SET user=? WHERE numPlace=?',[req.body.user, req.body.numPlace], function(err,result){
        if(err){
            return res.json({
                "error": true,
                "data": err.message
            })
        }else{
            return res.json({
                "error": false,
                "message": "Parking assigner avec succès"
            })
        }
    })
}

exports.deassign = function(req,res){
    db.query('UPDATE parking SET user=null WHERE numPlace=?',[req.body.numPlace], function(err,result){
        if(err){
            return res.json({
                "error": true,
                "data": err.message
            })
        }else{
            return res.json({
                "error": false,
                "message": "Parking de-assigner avec succès"
            })
        }
    })
}