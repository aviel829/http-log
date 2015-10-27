var express = require('express');
var app = express();
var http = require('http');
var common = require('./common');
var data = require('./data');

var server = http.createServer(app);

var bodyParser = require('body-parser');

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

app.get('/api/logs/', function (req, res) {

    var startDate = req.query.startDate;
    var endDate = req.query.endDate;

        //console.log(startDate, endDate);

        data.getLogs(startDate, endDate).then(function (logs) {
            res.json(logs);
    }, function () {
        res.status(500).send('data.getLogs failed');
    });

});

app.get('/api/download/', function (req, res) {

    var startDate = req.query.startDate;
    var endDate = req.query.endDate;

    data.getLogs(startDate, endDate)
        .then(function (logs) {
            common.getCsvLogs(logs)
                .then(function (csvData) {
                    res.setHeader('Content-disposition', 'attachment; filename=report.csv');
                    res.setHeader('Content-type', 'text/csv');
                    res.write(csvData);
                    res.end();
                });
        });
});

app.post('/api/report/', function (req, res) {
    var clientData = req.body;

    common.getIPAddressInfo(clientData.ip)
        .then(function (ipAddressInfo) {

            var logData = {
                ip: clientData.ip,
                time: clientData.time,
                referrer: clientData.referrer,
                query: clientData.query,
                userAgent: clientData.userAgent,
                url: clientData.url,

                country: ipAddressInfo.country,
                region: ipAddressInfo.region,
                isp: ipAddressInfo.isp,
                org: ipAddressInfo.org,
                city: ipAddressInfo.city
            };

            data.saveLog(logData).then(function () {
                res.send("success");

            }, function () {
                res.status(500).send('data.saveLog failed');
            });

        }, function () {
            res.status(500).send('common.getIPAddressInfo failed');
        });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/site.html");
});

var port = 8080;
server.listen(process.env.PORT || port);
console.log("listen to port", port);


