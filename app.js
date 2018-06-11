//Requires
const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const mongoose = require('mongoose');
const config = require('./config/db');
const path = require('path');

//Middleware
app.use(express.static(path.join(__dirname, 'client/dist/client')));


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