var Q = require('q');
var request = require('request');
var json2csv = require('json2csv');
var device = require('device');

//function exports that get object->logs and return object csv

exports.getCsvLogs = function (logs) {
    var cache = {};
    logs.forEach(function(log){

        var key = log.ip + log.url.hostname;

        var clicks = cache[key];


        if (!clicks)
        {
            clicks = 1
        }

        log.clicks = clicks;

        clicks += 1;
        cache[key] = clicks;
    });

    var objLogs = [];
    for (i = 0; i < logs.length; i++) {
        objLogs.push({
            ip: logs[i].ip,
            time: logs[i].time,
            referrer: logs[i].referrer,
            query: logs[i].query,
            userAgent: device(logs[i].userAgent).type,
            url: logs[i].url,
            country: logs[i].country,
            region: logs[i].region,
            isp: logs[i].isp,
            org: logs[i].org,
            city: logs[i].city,
            clicks: logs[i].clicks
        });
    }
    var def = Q.defer();
    var fields = ['ip', 'time', 'referrer', 'query', 'userAgent', 'url', 'country', 'region', 'isp', 'org', 'city', 'clicks'];
    json2csv({data: objLogs, fields: fields}, function (err, csv) {
        if (err) console.log(err);
        def.resolve(csv);

    });

    return def.promise;
};

exports.getIPAddressInfo = function (ipAddress) {
    var def = Q.defer();

    var url = 'http://ip-api.com/json/' + ipAddress;
    request(url, function (error, response, body) {
        if (error || response.statusCode != 200) {
            console.log('failed');
            def.reject();
            return;
        }

        var geoipData = JSON.parse(body);

        def.resolve({
            country: geoipData.country,
            region: geoipData.region,
            isp: geoipData.isp,
            org: geoipData.org,
            city: geoipData.city
        });

    });

    return def.promise;
};
