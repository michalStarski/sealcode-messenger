//Socket IO config for Sealcode Messenger

module.exports = function(io){
    io.on('connection', socket => {
        console.log('user connected');

        socket.on('message', data => {
            io.emit('message', data);
        })
    })
}