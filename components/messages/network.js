const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', function (req, res, next) {
    controller.getMessages()
        .then(booths => {
            response.success(req, res, booths, 200);
        })
        .catch(next);
});

router.get('/zone', function (req, res,next) {//http://localhost:6600/messages/zone?booth=5e992a6806505c5262396ff0
    const filterMessages = req.query.zone || null;
    controller.getMessagesbyzone(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(next)
});

router.get('/zone/count', function (req, res,next) {//http://localhost:6600/messages/zone/count?booth=5e992a6806505c5262396ff0
    const filterMessages = req.query.zone || null;
    controller.getMessagesCountZone(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(next)
});

router.patch('/:id', function (req, res, next) {
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});
//-----------------------INFLUXDB--------------------------------------------

router.post('/count', function (req, res, next) {
    controller.countbytime(req.body)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

router.post('/count/zoneordevice', function (req, res, next) {

    console.log(req.body)
    controller.consultbydevicezoneintime(req.body)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

router.post('/count/all/zones', function (req, res, next) {
    controller.countbyallzones()
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

router.post('/count/all/devices', function (req, res, next) {
    controller.countbyalldevices()
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

module.exports = router;