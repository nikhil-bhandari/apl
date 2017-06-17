const express = require("express");
const dataStore = require("../server/service/data-store.service");

module.exports = function (app) {
    app.use(express.static(__dirname + "/../client/"));

    app.get("/api/matches", (req, res) => {
        dataStore
            .get("MATCHES", (err, data) => {
                res.json(data);
            });
    });
    app.get("/api/deliveries/:matchId", (req, res) => {
        dataStore
            .get("DELIVERIES", (err, data) => {
                res.json(data[req.params.matchId]);
            });
    });
};