//Requiring all the module the code needss
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');

//Initializing modules
const app = express(); //app is the server

// Middleware setup
if (process.env.NODE_ENV != "test"){
    app.use(morgan("dev"));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use("/", require("./routes/index-route"));;
app.use("/index", require("./routes/index-route"));
app.use("/paciente", require('./routes/paciente-route'));
app.use("/medico", require('./routes/medico-route'));
app.use("/consulta", require('./routes/consulta-route'));
app.use('/cirurgia', require('./routes/cirurgia-route'));
app.use('/atendimento', require('./routes/atendimento-route'));
app.use('/internacao', require('./routes/internacao-route'));
app.use('/exame', require('./routes/exame-route'));


module.exports = app;
