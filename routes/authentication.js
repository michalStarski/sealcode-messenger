const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

module.exports = function(router){
    //Register route
    router.post('/register', function(req, res){
        //Data validation - check if user has provided all the data
        if(!req.body.username){
            res.json(
                {
                    success: false, 
                    message: 'Please provide an username'
                }
            );
        }
        if(!req.body.email){
            res.json(
                {
                    success: false, 
                    message: 'Please provide an email'
                }
            );
        }
        if(!req.body.password){
            res.json(
                {
                    success: false, 
                    message: 'Please provide a password'
                }
            );
        }
        else{
            const user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                password: req.body.password
            });
            //Save an user
            user.save(err => {
                if (err){
                    if(err.code === 11000)
                        res.json(
                            {
                                success: false, 
                                message: 'Email or Username already taken'
                            }
                        )
                    else
                        res.json(
                            {
                                success: false, 
                                message: 'Could not add an user ' + err
                            }
                        )
                }
                else{
                    res.json(
                        {
                            success: true, 
                            message: 'User successfully registered!'
                        }
                    )
                }
            })
        }
    });

    //Check if email is already taken
    router.get('/checkEmail/:email', function(req, res){
        const email = req.params.email;
        User.findOne({email: email}, (err, user) => {
            if(err){
                res.json(
                    {
                        success: false,
                        message: err
                    }
                )
            }
            if(user){
                res.json(
                    {
                        success: false,
                        message: 'Email is already taken'
                    }
                )
            }else {
                res.json(
                    {
                        success: true,
                        message: 'Email is not taken'
                    }
                )
            }
        })
    })

    //Check if username is already taken
    router.get('/checkUsername/:username', function(req, res){
        const username = req.params.username;
        User.findOne({username: username}, (err, user) => {
            if(err){
                res.json(
                    {
                        success: false,
                        message: err
                    }
                )
            }
            if(user){
                res.json(
                    {
                        success: false,
                        message: 'Username is already taken'
                    }
                )
            }else {
                res.json(
                    {
                        success: true,
                        message: 'Username is not taken'
                    }
                )
            }
        })
    });

    router.post('/login', function(req, res){ 
        if(!req.body.username){
            res.json(
                {
                    success: false,
                    message: 'Please provide your username'
                }
            )
        }
        if(!req.body.password){
            res.json(
                {
                    success: false,
                    message: 'Please provide your password'
                }
            )
        }
        else{
            User.findOne({ username: req.body.username }, (err, user) => {
                if(err){
                    res.json(
                        {
                            success: false,
                            message: err
                        }
                    )
                }else {
                    if(!user){
                        res.json(
                            {
                                success: false,
                                message: 'Username was not found'
                            }
                        )
                    }else {
                        const validPassword = user.checkPassword(req.body.password);
                        if(!validPassword) {
                            res.json(
                                {
                                    success: false,
                                    message: 'Wrong password'
                                }
                            )
                        }
                        else{
                            const token = jwt.sign({userId: user._id}, config.secret, {expiresIn: '24h'});
                            res.json(
                                {
                                    success: true,
                                    message: 'Success!',
                                    token: token,
                                    user: user.username
                                }
                            )
                        }
                    }
                }
            })
        }
    })

    return router;
}