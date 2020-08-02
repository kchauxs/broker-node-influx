const store = require('./store');
const nanoid = require('nanoid');

function addDevice(body) {

    if (!body) {
        return Promise.reject('Invalid Device');
    }

    const device = {
        name: body.name + "_" + nanoid.nanoid(10),
        zone: body.zone,
    };

    return store.addDevice(device)
}

function listDevices() {
    return store.listDevices();
}

function listDevicesByZone(id) {
    if (!id) {
        return Promise.reject('Invalid id zone');
    }
    return store.listDevicesByZone(id);
}

function deleteDevice(id) {
    if (!id) {
        return Promise.reject('Invalid id device');
    }
    return store.deleteDevice(id);

}
function deleteManyDevice(zone) {
    if (!zone) {
        return Promise.reject('Invalid id zone');
    }
    return store.deleteManyDevice(zone);
}



module.exports = {
    addDevice,
    listDevices,
    listDevicesByZone,
    deleteDevice,
    deleteManyDevice
}
