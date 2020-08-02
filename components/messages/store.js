const Model = require('./model');
const { influx_sensors } = require('../../store/setup')

function addMessage(message) {
    const myMessage = new Model(message);
    return myMessage.save();
}

function getMessages() {
    return Model.find();
}

async function getMessagesbyzone(filterZone) {

    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterZone !== null) {
            filter = { zone: filterZone };
        }
        Model.find(filter)
            .populate('zone')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
            });
    })
}
async function getMessagesCountzone(filter) {


    return Model.countDocuments(filter)
}

function removeMessage(id) {
    return Model.deleteOne({
        _id: id
    });
}
//---------------------------------------
async function updateMessage(id, message) {

    var msg = message.toString()
    var sp = msg.split(",")

    var card = sp[0]
    var temp = sp[1]
    var occupation = sp[2]

    const foundMessage = await Model.findOne({
        _id: id
    });

    foundMessage.card = card;
    foundMessage.temp = temp;
    foundMessage.occupation = occupation;

    const newMessage = await foundMessage.save();
    return newMessage;
}

//-----------------------INFLUXDB--------------------------------------------
function addMessageInflux(message) {

    return influx_sensors.writePoints([
        {
            measurement: 'messages',
            tags: {
                zone: message.zone,
                occupation: message.occupation,
                device: message.device
            },
            fields: {
                temp: message.temp,
                identification: message.identification
            },
        }
    ])
}

function countbyallzones() {

    return influx_sensors.
        query(`select count("temp") from "messages" group by "zone"`)
}

function countbyalldevices() {
    return influx_sensors.
        query(`select count("temp") from "messages" group by "device"`)
}

function countbytime(query) {

    return influx_sensors.
        query(`select count("temp") from messages where time >='${query.date1}' and time <= '${query.date2}' `)
}

function consultbydevicezoneintime(query) {

    return influx_sensors.
        query(`SELECT COUNT("temp") FROM "messages" WHERE "${query.type}"='${query.zoneordevice}' AND time >= '${query.date1}' AND time <= '${query.date2}'`)
}

module.exports = {
    add: addMessage,
    list: getMessages,
    listbyzone: getMessagesbyzone,
    listCountzone: getMessagesCountzone,
    updateMessage: updateMessage,
    remove: removeMessage,
    addMessageInflux,
    countbytime,
    countbyallzones,
    countbyalldevices,
    consultbydevicezoneintime
}