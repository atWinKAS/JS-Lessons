var fs = require('fs');
var uuid = require('node-uuid');
var http = require('http');
var url = require('url');
var WebSocketServer = require('ws').Server;
var _ = require('lodash');

process.umask(0);

var data = [
{ id: uuid.v4(), name: 'Иванов Иван', inHall: false },
{ id: uuid.v4(), name: 'Петров Петр', inHall: false },
{ id: uuid.v4(), name: 'Сидоров Сидр', inHall: false }
];

var srv = http.createServer(function (req, res) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }

    var path = url.parse(req.url).pathname;
    if (path !== '/list') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, reason: 'Not found' }));
        return;
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
});

var wss = new WebSocketServer({ server: srv, path: '/ws' });

wss.broadcast = function broadcast(data, owner) {
    wss.clients.forEach(function each(client) {
        if (client !== owner) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        try {
            var payload = JSON.parse(message);
        } catch (e) {
            console.log('Bad payload ' + message);
            return;
        }
        console.log(payload);

        if (payload.action === 'add' && payload.guest && payload.guest.id && payload.guest.name) {
            var item = _.find(data, {id: payload.guest.id});
            if (item) {
                ws.send('Duplicate entry');
                return;
            }
            data.push({id: payload.guest.id, name: payload.guest.name, inHall: false});
            wss.broadcast(message, ws);
            return;
        }

        if (payload.action === 'remove' && payload.id) {
            data = _.reject(data, {id: payload.id});
            wss.broadcast(message, ws);
            return;
        }

        if (payload.action === 'update' && payload.guest && payload.guest.id && typeof payload.guest.inHall !== 'undefined') {
            var item = _.find(data, {id: payload.guest.id});
            if (item) {
                item.inHall = !!payload.guest.inHall;
            }
            wss.broadcast(message, ws);
            return;
        }

        ws.send('You are sending something bad');
    });
});
srv.listen(3000);

//fs.unlink('/tmp/smartjs.f2.sock', function () {
//    srv.listen('/tmp/smartjs.f2.sock');
//});