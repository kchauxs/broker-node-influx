const Model = require('./model');


function addDevice(device) {
    const mydevice = new Model(device);
    return mydevice.save();
}


function listDevices() {
    return Model.find();
}


function listDevicesByZone(zone) {
    return Model.find({zone:zone});
}

function deleteDevice(id) {
    return Model.deleteOne({
        _id: id
    });
}

function deleteManyDevice(zone) {
    return Model.deleteMany({
        zone: zone
    });
}



module.exports = {
    addDevice,
    listDevices,
    listDevicesByZone,
    deleteDevice,
    deleteManyDevice
}