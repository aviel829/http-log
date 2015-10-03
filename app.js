var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


var cached_data = [];

app.get('/api/report/', function (request, response) {
    response.json(cached_data);
});

app.post('/api/report/', function (request, response) {
    var data = request.body;
    cached_data.push(data);
    console.log(data);

    response.send("ok");
});

app.get('/', function (request, response) {
    response.sendFile(__dirname + "/site.html");
});

var port = 8080;
server.listen(port);
console.log("listen to port", port);


