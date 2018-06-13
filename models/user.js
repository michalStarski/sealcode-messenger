//User model
const bcrypt = require('bcrypt-nodejs');

//Mongoose config
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//Validation methods for email, username and password
const validateEmail = email => {
    if(!email)
        return false;
    const check = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return check.test(email);
}

const validateUsername = username => {
    if(!username)
        return false;
    if(username.length < 5)
        return false;
    const check = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
    return check.test(username);
}

const validatePassword = password => {
    if(!password)
        return false;
    if(password.length < 5)
        return false;
    return true;
}

//Validator arrays
const emailValidators = [{
    validator: validateEmail,
    message: 'Must be a valid email'
}]

const usernameValidators = [{
    validator: validateUsername,
    message: 'Username must contain only valid characters and have more then 5 characters'
}]

const passwordValidators = [{
    validator: validatePassword,
    message: 'Password must have at least 5 characters'
}]


const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, required: true, validate: passwordValidators },
});

//Middleware to hash the password
userSchema.pre('save', function(next){
    //Hash method
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if(err)
            return next(err);
        //Set password to the hashed one
        this.password = hash
        //Exit the middleware
        next();
    })
})

//Check password method
userSchema.methods.checkPassword = function(password){
    //Compare typed password with a correct one
    return (bcrypt.compareSync(password, this.password));
}

module.exports = mongoose.model('User', userSchema);