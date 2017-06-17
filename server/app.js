const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require("./config");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

require("./routes")(app);

app.listen(config.port, function () {
    console.log("Server running at http://localhost:" + config.port);
});
