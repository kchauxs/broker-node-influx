const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();


router.get('/total', function(req, res, next) {
    controller.totaldecasos()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});
router.get('/clasificacion', function(req, res, next) {
    controller.clasificacion()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});
router.get('/departamentos', function(req, res, next) {
    controller.departamentos()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

router.get('/ciudad', function(req, res, next) {
    controller.ciudad()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

router.get('/genero', function(req, res, next) {
    controller.genero()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});


module.exports = router;