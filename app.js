var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var request = require('request');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


var cached_data = [];

app.get('/api/report/', function (request, response) {
    response.json(cached_data);
});

app.post('/api/report/', function (req, res) {
    var data = req.body;
    var ip = data.ip;
    var url = 'https://freegeoip.net/json/'+ip;

    request(url, function (error, response, body) {
        if (error || response.statusCode != 200) {
            console.log('failed');
            res.send("failed");
            return;
        }

        var geoipData = JSON.parse(body);
        data.country = geoipData.country_name;
        data.region = geoipData.region_name;

        cached_data.push(data);
        console.log(data);

        res.send("success");
    });

});

app.get('/', function (request, response) {
    response.sendFile(__dirname + "/site.html");
});

var port = 8080;
server.listen(process.env.PORT || port);
console.log("listen to port", port);


