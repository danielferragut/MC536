//Requiring all the module the code needss
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//Initializing modules
const app = express(); //app is the server
// Middleware setup
if (process.env.NODE_ENV != "test"){
    app.use(morgan("dev"));
}
app.use(bodyParser.json());

//Routes
app.use("/index", require("./routes/index-route"));
// app.use("/user", require("./routes/user"));
// app.use("/team", require("./routes/team"));
// app.use("/oAuth", require("./routes/oAuth"));

module.exports = app;
