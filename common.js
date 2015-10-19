var Q = require('q');
var request = require('request');

exports.getIPAddressInfo = function (ipAddress) {
    var def = Q.defer();

    var url = 'http://api.minecraft-alex.ru/ip/getinfo/ip=' + ipAddress;
    request(url, function (error, response, body) {
        if (error || response.statusCode != 200) {
            console.log('failed');
            def.reject();
            return;
        }

        var geoipData = JSON.parse(body);

        def.resolve({
            country: geoipData.country,
            region: geoipData.regionName,
            isp: geoipData.isp,
            org: geoipData.org,
            city: geoipData.city
        });

    });

    return def.promise;
};
