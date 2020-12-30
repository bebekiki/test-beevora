const mysql = require('mysql');
const bycrypt = require('bcryptjs');

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//connexion à la BD
db.connect();

exports.register = function(req,res){

    const {name,email,password,rôle} = req.body;
    
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error,result) => {
      
        if(error){  
            return res.json({
                "error":true,
                "message": "Erreur d'enregistrement, veuillez réessayer !!!"
            })
        }
        else if(result.length > 0) {
            return res.json({
                "error":true,
                "message":"Un utilisateur existe déjà avec cet email !!!"
            })
        }
        else{
            
            let cryptPassword = await bycrypt.hash(password,10);
            db.query('INSERT INTO users(name,email,password,rôle) VALUES(?,?,?,?)',[name,email,cryptPassword,rôle],(err,results)=>{
                return res.json({
                    "error":false,
                    "message": "Utilisateur cré avec succès !!!"
                })
            });
        }
    })
}

exports.login = function(req,res){
    const {email, password} = req.body;
    
    db.query('SELECT * FROM users where email = ?',[email], async (err,results) =>{
        
        if(results.length == 0 || (await bycrypt.compare(password,results[0].password)) == false){
            return res.json({
                "error":true,
                "message":"Aucun utilisateur trouvé désolé !!!"
            })
        }
        else{
            return res.json({
                "error":false,
                "data": results
            })
        }
    });
}
