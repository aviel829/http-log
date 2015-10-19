var common = require('./common');
var data = require('./data');
var request = require('request');

/*

 common.getIPAddressInfo('79.180.131.156')
 .then(function (ipAddressInfo) {
 console.log('success', ipAddressInfo);
 }, function () {
 console.log('error');
 });

 */
/*

 var startDate = '2015-10-05';
 var endDate = '2015-10-08';

 data.getLogs(null, endDate).then(function (logs) {
 console.log('success', logs);
 }, function () {
 console.log('error');
 });
*/


/*

 data.deleteAllLogs().then(function () {
 console.log('success');
 }, function () {
 console.log('error');
 });
*/

/*

var logData = {
    ip: '85.250.63.199',
    time: new Date().getUTCMilliseconds() * 1000,
    referrer: '0',
    query: '',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
    url: 'http://localhost:8081/plombiers/',
    country: "Israel",
    region: "Tel Aviv",
    isp: "Bezeq",
    org: "",
    city: undefined
};

data.saveLog(logData).then(function () {
    console.log('success');
}, function () {
    console.log('error');
});
*/


/*

 var postData = {
 ip: '85.250.63.198',
 time: '1444763571000',
 referrer: '0',
 query: '',
 userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
 url: 'http://localhost:8081/plombiers/'
 };

 var options = {
 uri: 'http://localhost:8080/api/report/',
 method: 'POST',
 json: postData
 };

 request(options, function (error, response) {
 if (!error && response.statusCode == 200) {
 console.log('ok'); // Print the shortened url.
 }
 });

 */
