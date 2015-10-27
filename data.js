var url = "mongodb://localhost/http-log";//"mongodb://aviel:aviel@ds041633.mongolab.com:41633/http-log"

var Q = require('q');
var mongoose = require('mongoose');
mongoose.connect(url);

var Log = mongoose.model('Log',
    {
        ip: String,
        time: Date,
        referrer: String,
        query: String,
        userAgent: String,
        url: String,
        country: String,
        region: String,
        isp: String,
        org: String,
        city: String
    });


exports.saveLog = function (logData) {
    var def = Q.defer();

    var log = new Log(
        {
            ip: logData.ip,
            time: new Date(parseInt(logData.time)),
            referrer: logData.referrer,
            query: logData.query,
            userAgent: logData.userAgent,
            url: logData.url,
            country: logData.country,
            region: logData.region,
            isp: logData.isp,
            org: logData.org,
            city: logData.city
        }
    );

    log.save(function (err) {

        if (err) {
            def.reject(err);
            return;
        }

        def.resolve();

    });
    return def.promise;
};

exports.getLogs = function (startDate, endDate) {
    var def = Q.defer();

    var filters = {};

    if (startDate || endDate) {

        filters.time = {};

        if (startDate) {
            filters.time.$gte = startDate;
        }

        if (endDate) {
            filters.time.$lte = endDate;
        }
    }

    Log.find(filters, function (err, logs) {
        if (err) {
            def.reject(err);
            return;
        }
        def.resolve(logs);
    });

    return def.promise;
};

exports.deleteAllLogs = function () {
    var def = Q.defer();

    Log.find({}).remove().exec(function (err) {

        if (err) {
            def.reject(err);
            return;
        }

        def.resolve();

    });

    return def.promise;

};

