const User = require('../models/user');

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

    return router;
}