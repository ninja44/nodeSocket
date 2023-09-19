const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`server listening on port ${port} `);
});

app.get('/' , (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message',(msg) => {
        console.log(`Smessage: ${msg}`);
        io.emit('message',msg);
    });
    socket.on('disconnect', () => {
        console.log('user Disconnected');
        io.emit('message','user disconnected');
    });
     });
