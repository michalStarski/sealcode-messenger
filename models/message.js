const mongoose = require('mongoose');

//Mongoose config
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const messageSchema= new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now},
    senderAvatar: {type: String, required: true},
    senderAvatarColor: {type: String, required: true},
})

module.exports = mongoose.model('Message', messageSchema);