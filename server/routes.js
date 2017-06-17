const express = require("express");
const dataStore = require("../server/service/data-store.service");

module.exports = function (app) {
    app.use(express.static(__dirname + "/../client/"));

    app.get("/api/matches", (req, res) => {
        const max = 10;
        const page = req.query.page || 1;
        const query = (req.query.q || "").toLowerCase();

        dataStore
            .get("MATCHES", (err, data) => {
                let filteredData;
                if (query) {
                    filteredData = data.filter((item) => {
                        return item.team.a.toLowerCase().indexOf(query) > -1
                            || item.team.b.toLowerCase().indexOf(query) > -1;
                    })
                } else {
                    filteredData = data;
                }
                res
                    .json(
                        filteredData
                            .slice((page - 1) * 10, page * 10)
                    );
            });
    });
    app.get("/api/deliveries/:matchId", (req, res) => {
        dataStore
            .get("DELIVERIES", (err, data) => {
                res.json(data[req.params.matchId]);
            });
    });
};