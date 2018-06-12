//Requires
const app = require('express')(); //express app
const express = require('express'); //express.js
const http = require('http').Server(app); //http server
const mongoose = require('mongoose'); //mongoDB handling library
const config = require('./config/db'); //database configuration
const path = require('path'); //node.js path handler
const router = express.Router(); //express router handler
const authentication = require('./routes/authentication')(router); //authentication routes
const bodyParser = require('body-parser'); //body parsing middleware

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/dist/client')));
app.use('/authentication', authentication);

//Routes
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

//Database configuration
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, err => {
    if(err)
        console.log('Not connected to database ' + err);
    else{
        console.log('Connected to databse ' + config.db)
    }
});


//http://localhost:8080
http.listen(process.env.PORT || 8080, console.log('Server listening on port 8080'));