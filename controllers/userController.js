'use strict';

const UserRepository = require('../repositories/UserRepository');
const index = require('../index.js');

module.exports = new class UserController {

    get = (req, res, next) => {
        UserRepository.getAll()
            .then((User) => {
                res.status(200).send(User);
            }).catch(err => res.status(500).send(err))
    };

    getById = (req, res, next) => {

        UserRepository.getById(req.params.id)
            .then((User) => {
                res.status(200).send(User);
            }).catch(err => res.status(500).send(err))
    };

    post = (req, res, next) => {
        const p = req.body;

        UserRepository.create(p)
            .then((User) => {
                res.status(200).send(User);
                index.scheduleDay(user);
            }).catch(err => res.status(500).send(err))
    };

    put = (req, res, next) => {
        const p = req.body;

        UserRepository.update(req.params.id, p)
            .then((User) => {
                res.status(201).send(User);
            }).catch(err => res.status(500).send(err))
    };

    delete = (req, res, next) => {
        UserRepository.delete(req.params.id)
            .then((User) => {
                res.status(200).send('delete succeeded!');
            }).catch(err => console.error.bind(console, `Error ${err}`))
    };
}

module.exports = UserController;