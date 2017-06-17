const fs = require('fs');
const parse = require('csv-parse');
const config = require("./config");
const _ = require("lodash");
const dataStore = require("./service/data-store.service");

function parseDeliveries(cb) {
    parseCSV("deliveries.csv", function (err, data) {
        if (err) {
            return cb(err);
        }

        const result = _
            .chain(data)
            .map((item) => {
                return {
                    matchId: item[0],
                    inning: item[1],
                    battingTeam: item[2],
                    bowlingTeam: item[3],
                    over: item[4],
                    ball: item[5],
                    batsman: item[6],
                    nonStriker: item[7],
                    bowler: item[8],
                    isSuperOver: item[9],
                    runs: {
                        wide: item[10],
                        bye: item[11],
                        legbye: item[12],
                        noball: item[13],
                        penalty: item[14],
                        batsman: item[15],
                        extra: item[16],
                        total: item[17],
                    },
                    playerDismissed: item[18],
                    dismissalKind: item[19],
                    fielder: item[20]
                }
            })
            .reduce((acc, item) => {
                if (acc[item.matchId]) {
                    acc[item.matchId].push(item);
                } else {
                    acc[item.matchId] = [item];
                }
                return acc;
            }, {})
            .value();

        return cb(null, result);
    })
}

function parseMatches(cb) {
    parseCSV("matches.csv", function (err, data) {
        if (err) {
            return cb(err);
        }

        const matches = data.map((item) => {
            return {
                id: item[0],
                season: item[1],
                city: item[2],
                date: new Date(item[3]),
                team: {
                    a: item[4],
                    b: item[5],
                },
                tossWinner: item[6],
                tossDecision: item[7],
                result: item[8],
                dlApplied: item[9],
                winner: item[10],
                winBy: {
                    runs: item[11],
                    wickets: item[12]
                },
                playerOfMatch: item[13],
                venue: item[14],
                umpires: [item[15], item[16], item[17]].filter((i) => i),
            }
        });

        return cb(null, matches);
    })
}

function parseCSV(fileName, cb) {
    const parser = parse({}, cb);
    fs.createReadStream([__dirname, '../data', fileName].join("/")).pipe(parser);
}

module.exports.start = function (cb) {
    if (config.seed) {

        console.log("Seeding is enabled");

        console.time("SEEDING:MATCHES");
        console.time("SEEDING");

        parseMatches(function (err, matches) {

            if (err) {
                cb(err);
                return console.log(err);
            }

            console.timeEnd("SEEDING:MATCHES");
            console.time("SEEDING:DELIVERIES");

            parseDeliveries(function (err, deliveries) {

                if (err) {
                    cb(err);
                    return console.log(err);
                }

                dataStore.set("MATCHES", matches);
                dataStore.set("DELIVERIES", deliveries);

                console.timeEnd("SEEDING:DELIVERIES");
                console.timeEnd("SEEDING");
                cb();
                console.log("Seeding complete");
            });
        });
    } else {
        console.log("Seeding is disabled by config option");
        cb();
    }
};