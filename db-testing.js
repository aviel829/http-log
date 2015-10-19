var request = require('request');
var Q = require('q');


//saveLog(data);
//deleteAllLogs();
getLogs().then(function (logs) {
    console.log(logs);
}, function () {
    console.error('error');
});

//save();
