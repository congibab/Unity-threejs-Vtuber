var WebSocketServer = require('ws').Server
    , http = require('http')
    , express = require('express')
    , app = express();

app.use(express.static(__dirname + '/public'));
var server = http.createServer(app);
var wss = new WebSocketServer({ port: 5001 });

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// })

wss.on('connection', function (ws) {

    console.log("test");

    ws.on('close', function () {
        console.log("disconnect athoer client");
    });

    //ws.send("send test");

    ws.on('message', function (message) {
        //console.log('message: ' + message);
        let data = JSON.parse(message);
        //console.log('' +  message);
        console.log(data);

        wss.clients.forEach(function each(client) {
            if (client !== ws) {
                //client.send(message);
                client.send(JSON.stringify(data));
              
            }
          });

    });
});

server.listen(3000);