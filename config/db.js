const mongoose = require('mongoose');
const dotEnv= require('dotenv');

dotEnv.config();

var uri = process.env.URI;

mongoose.connect(uri, {user: process.env.MONGO_DB_USERNAME, pass: process.env.MONGO_DB_PASSWORD, useNewUrlParser: true});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    login: String,
    password: String,
    uid: String,
    uuid: String,
    init_day_hour: String,
    lunch_day_hour: String,
    init_day_hour: String,
    first_return_day_hour: String,
    end_day_hour: String
});


var User = mongoose.model('User', userSchema);
module.exports = User;