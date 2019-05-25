//Requiring all the module the code needss
const express = require("express");
const morgan = require("morgan");

//Initializing modules
const app = express(); //app is the server
// Middleware setup
if (process.env.NODE_ENV != "test"){
    app.use(morgan("dev"));
}

app.use(express.urlencoded({extended: true}));

//Routes
app.use("/index", require("./routes/index-route"));
app.use("/paciente", require('./routes/paciente-route'))
module.exports = app;
