//Socket IO config for Sealcode Messenger

const Message = require('../models/message');

module.exports = function(io){
    io.on('connection', socket => {
        console.log('user connected');

        //On connection fetch global messages from the database and emit them to the client
        Message.find({ to: 'global' }, function(err, docs){
            socket.emit('fetchedGlobal', docs);
        })

        socket.on('message', data => {
            console.log(data);
            //If received a message, save it to the database and emit it back
            const m = new Message({
                from: data.from,
                to: data.to,
                content: data.content,
                date: Date.now(),
                senderAvatar: data.senderAvatar,
                senderAvatarColor: data.senderAvatarColor
            });
            m.save(err => {
                if(err)
                    throw err;
                console.log('saved!');
            })
            io.emit('message', data);
        })
    })
}