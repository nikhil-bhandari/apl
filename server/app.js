const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require("./config");
const seed = require("./seed");
const dataStore = require("./service/data-store.service");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

require("./routes")(app);

seed.start(function (err) {
    if (err) {
        return console.log("Seed Failed. Exiting");
    }

    app.listen(config.port, function () {
        console.log("Server running at http://localhost:" + config.port);
    });
});

