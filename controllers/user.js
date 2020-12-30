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

exports.read = function(req,res){
    db.query('SELECT * FROM users', function(err,result){
        if(err){
            return res.json({
                "error": true,
                "message": "Erreur veuillez réessayer "
            })
        }else{
            return res.json({
                "error": false,
                "data": result
            })
        }
    })
}

exports.update = async function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user_id = req.body.id;

    if(name == null){
        
        let cryptPassword =  await bycrypt.hash(password,10);
        db.query("UPDATE users SET email = ?, password = ? WHERE id = ?", [email, cryptPassword, user_id], function (err, result){
            if(err){
                return res.json({
                    "error": true,
                    "message": err.message
                })
            }else{
                return res.json({
                    "error": false,
                    "message": "utilisateur modifié avec succès"
                })
            }
        })
    }
    else if(email == null){
        let cryptPassword =  await bycrypt.hash(password,10);
       
        db.query('UPDATE users SET name=?, password=? WHERE id=?',[name, cryptPassword, user_id], function(err,result){
            if(err){
                return res.json({
                    "error": true,
                    "message": "L'utilisateur n'a pas été modifié, veuillez réessayer "
                })
            }else{
                return res.json({
                    "error": false,
                    "message": "utilisateur modifié avec succès"
                })
            }
        })
    }
    else if(password == null){
        
        db.query('UPDATE users SET name=?, email=? WHERE id=?', [name, email, user_id], function(err,result){
            if(err){
                return res.json({
                    "error": true,
                    "message": "L'utilisateur n'a pas été modifié, veuillez réessayer "
                })
            }else{
                return res.json({
                    "error": false,
                    "message": "utilisateur modifié avec succès"
                })
            }
        })
    }
    else{
        let cryptPassword =  await bycrypt.hash(password,10);
        db.query('UPDATE users SET name=?, email=?, password=?  WHERE id=?', [name, email, cryptPassword, user_id], function(err,result){
            if(err){
                return res.json({
                    "error": true,
                    "message": "L'utilisateur n'a pas été modifié, veuillez réessayer "
                })
            }else{
                return res.json({
                    "error": false,
                    "message": "utilisateur modifié avec succès"
                })
            }
        })
    }
}

exports.delete = function(req,res){
    
    db.query('DELETE FROM users WHERE id=?', [req.body.id], function(error,result){
        if(error){
            return res.json({
                "error": true,
                "message": "L'utilisateur n'a pas été supprimé, veuillez réessayer "
            }) 
        }else if(result.affectedRows == 0){
            return res.json({
                "error": true,
                "message": "Aucun utilisateur trouvé avec cet id"
            })
        }
        else{
            return res.json({
                "error": false,
                "message": "Utilisateur supprimé avec succès"
            })
        }
    })
}