const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();


router.get('/users', function (req, res, next) {

    controller.users()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

router.get('/infonode', function (req, res, next) {

    controller.infoNode()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

router.get('/allclients', function (req, res, next) {

    controller.allClients()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});
router.get('/perclientid/:id', function (req, res, next) {
    //console.log(req.params)
    controller.perClientid(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});
router.get('/metrics', function (req, res, next) {
    controller.metrics()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});
router.get('/routes', function (req, res, next) {
    controller.routes()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});
router.get('/stats', function (req, res, next) {
    controller.stats()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});
router.get('/subscriptions', function (req, res, next) {
    controller.subscriptions()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

router.get('/subscriptions/id/:id', function (req, res, next) {
    controller.subscriptionsbyId(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

router.post('/publish', function (req, res, next) {
    let data = JSON.stringify(req.body)
    controller.publish(data)
        .then(data => {
            response.success(req, res, data, data.status);
        })
        .catch(next);
});

router.get('/list', function (req, res, next) {
    controller.listusers()
        .then(users => {
            response.success(req, res, users, 200);
        })
        .catch(next);
});

router.post('/username', function (req, res, next) {
    controller.addusername(req.body)
        .then(users => {
            response.success(req, res, users, 200);
        })
        .catch(next);
});


router.delete('/:id', function (req, res, next) {
    controller.deleteUser(req.params.id)
        .then(users => {
            response.success(req, res, users, 200);
        })
        .catch(next);
});


module.exports = router;