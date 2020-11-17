'use strict';
var mongoose = require('mongoose')
var User = require('../config/db');

module.exports = new class UserRepository {

    getAll() {
        return User.find();
    }

    getById(id) {
        return User.findById(id);
    }

    create(user) {
        return User.create(user);
    }

    update(id, user) {

        const updatedUser = {
            login: user.login,
            password: user.password,
            uid: user.uid,
            uuid: user.uuid,
            init_day_hour: user.init_day_hour,
            lunch_day_hour: user.lunch_day_hour,
            init_day_hour: user.init_day_hour,
            first_return_day_hour: user.first_return_day_hour,
            end_day_hour: user.end_day_hour
        }

        return User.findByIdAndUpdate(id, updatedUser, { new: true });
    }

    delete(id) {
        return User.findByIdAndRemove(id);
    }

}