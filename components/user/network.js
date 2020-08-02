const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const secure = require('./secure')
const auth = require('../auth/controller')
const router = express.Router();

router.post('/', function (req, res, next) {
    controller.addUser(req.body)
        .then(data => {
            return auth.insert({
                id: data._id,
                username: data.username,
                password: req.body.password,
            })
        })
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
});

router.put('/', secure('update'), function (req, res, next) {
    controller.updateUser(req.body)
        .then(data => {
            //console.log(data)
            return auth.update(data, req.body.password)
        })
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
});


router.get('/', function (req, res, next) {
    controller.listUsers()
        .then(users => {
            response.success(req, res, users, 200);
        })
        .catch(next);
});

module.exports = router;