const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const { influx_sensors } = require('../../store/setup')
const config = require('../../config')
const client_mqtt = require('./mqtt')
const app = express()

client_mqtt()
app.use(bodyParser.json())

influx_sensors.getDatabaseNames()
    .then(names => {
        /*
        if (!names.includes('mydb')) {
          return influx.createDatabase('mydb');
        }
        */
        console.log('Connection to the database ->',names)
    })
    .then(() => {
        app.listen(config.mqtt.port_mqtt, () => {
            console.log('Servicio de mqtt-post escuchando en el puerto', config.mqtt.port_mqtt)
        });
    })
    .catch(err => {
        console.error(`Error creating Influx database!`);
    })