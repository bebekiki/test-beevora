const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

//configurer le fichier pourr les infos sensibles
dotenv.config({path:'./config.env'});

//authoriser le passage de données 
app.use(express.urlencoded({extended:true}));

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/auth' ,require('./routes/auth')); 
app.use('/user' ,require('./routes/user')); 
app.use('/parking' ,require('./routes/parking')); 
app.use('/search' ,require('./routes/search')); 

const port = process.env.port || 5000;

app.listen(port, function(){
    console.log('server started on port '+ port);
})