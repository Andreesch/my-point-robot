'use strict';

const UserRepository = require('/app/repositories/userRepository');
const Point = require('/app/point');

exports.register = (req, res, next) => {
    UserRepository.getById(req.params.id)
        .then((User) => {
            Point.scheduleDay(User);
            res.status(200).send("Registro realizado com sucesso!");
        }).catch(err => res.status(500).send(err))
}; 

exports.get = (req, res, next) => {
    UserRepository.getAll()
        .then((User) => {
            res.status(200).send(User);
        }).catch(err => res.status(500).send(err))
}; 

exports.getById = (req, res, next) => {

    UserRepository.getById(req.params.id)
        .then((User) => {
            res.status(200).send(User);
        }).catch(err => res.status(500).send(err))
};

exports.post = (req, res, next) => {
    const p = req.body;

    if (p.login == null) {
        res.status(403).send("Parâmetros inválidos");
    }

    UserRepository.create(p)
        .then((User) => {
            res.status(200).send(User);
            //index.scheduleDay(user);
            console.log(User);
        }).catch(err => res.status(500).send(err))
};

exports.put = (req, res, next) => {
    const p = req.body;

    UserRepository.update(req.params.id, p)
        .then((User) => {
            res.status(201).send(User);
        }).catch(err => res.status(500).send(err))
};

exports.delete = (req, res, next) => {
    UserRepository.delete(req.params.id)
        .then((User) => {
            res.status(200).send('delete succeeded!');
        }).catch(err => console.error.bind(console, `Error ${err}`))
};