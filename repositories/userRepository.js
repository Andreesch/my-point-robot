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

    create(User) {
        return User.create(User);
    }

    update(id, User) {

        const updatedUser = {
            login: User.login,
            password: User.password,
            uid: User.uid,
            uuid: User.uuid,
            init_day_hour: User.init_day_hour,
            lunch_day_hour: User.lunch_day_hour,
            init_day_hour: User.init_day_hour,
            first_return_day_hour: User.first_return_day_hour,
            end_day_hour: User.end_day_hour
        }

        return User.findByIdAndUpdate(id, updatedUser, { new: true });
    }

    delete(id) {
        return User.findByIdAndRemove(id);
    }

}