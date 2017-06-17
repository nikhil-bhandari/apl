const redis = require("redis"),
    config = require("../config"),
    client = redis.createClient(config.redis.url);

module.exports.set = function (key, value) {
    client.set(key, JSON.stringify(value), function (err, reply) {

    })
};

module.exports.get = function (key, cb) {
    client.get(key, (err, reply) => {
        if (err) {
            return cb(err);
        }

        return cb(null, JSON.parse(reply));
    });

};

client.on("error", function (err) {
    console.log("Error " + err);
});