const cron = require('node-cron');
const express = require('express');
const axios = require('axios');
const dotEnv= require('dotenv');
const bodyParser = require("body-parser");

//Env Parameters
dotEnv.config();

//Routes
const personRoute = require('./routes/userRoute');

app = express();

app.listen(process.env.PORT);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/users', personRoute);

module.exports = app;
