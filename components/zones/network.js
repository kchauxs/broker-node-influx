const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const controller_emq = require('../emqx/controller')
const controller_device = require('../devices/controller')
const { influx, Influx } = require('../../store/setup')
const router = express.Router();
const os = require('os')
const secure = require('./secure')

router.post('/', /* secure('logged')*/ function (req, res, next) {
    let aux_id = ''
    controller_emq.addRandomUser(req.body.zone)
        .then(data => {
            aux_id = data._id
            return controller.addZone(req.body, /*req.user,*/req.body.user, data)
        })
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(err => {

            controller_emq.deleteUser(aux_id).then(next())

        })
});




router.get('/', function (req, res, next) {
    controller.listZones()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});


router.patch('/', function (req, res, next) {
    controller.updateZone(req.body.id, req.body)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});

/*

router.delete('/clients/:id', function (req, res, next) {

    let aux_id = req.params.id

    controller.deleteZone(req.params.id)
        .then((data) => {
            return controller_device.deleteManyDevice(aux_id)
        })
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
});
*/

router.delete('/all/:id', function (req, res, next) {

    controller.deleteZoneFull(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);

});



//-----------------INFLUX-------------------
/*

router.get('/times', function (req, res, next) {
    influx.query(`
      select * from response_times
      where host = ${Influx.escape.stringLit(os.hostname())}
      order by time desc
      limit 10
    `).then(data => {
        //res.json(data)
        response.success(req, res, data, 200);
    }).catch(next);
});
*/
module.exports = router;