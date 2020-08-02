const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/add', function (req, res, next) {
    console.log(req.cookies)
    controller.addDevice(req.body)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

router.get('/list/:id', function (req, res, next) {
    
    controller.listDevicesByZone(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

router.get('/', function (req, res, next) {
    
    controller.listDevices()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});


router.delete('/one/:id', function (req, res, next) {
    controller.deleteDevice(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});
router.delete('/many/:id', function (req, res, next) {
    controller.deleteManyDevice(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

module.exports = router;