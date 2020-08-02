const store = require('./store');
const controller_device = require('../devices/controller')
const controller_emq = require('../emqx/controller')

function addZone(zone, user, data) {
    if (!zone || !data) {
        return Promise.reject('Invalid zone');
    }
    console.log(user)
    const booth = {
        campus: zone.campus,
        user: user,
        idusername: data._id,
        username: data.username,
        pass: data.password,
        zone: zone.zone
    };

    return store.add(booth);
}

function listZones() {
    return store.list();
}


function updateZone(id, body) {

    if (!id || !body.campus || !body.zone) {
        return Promise.reject('Invalid Update - zone');
    }
    return store.updateZone(id, body);

}
function deleteZone(id) {

    if (!id) {
        return Promise.reject('Invalid Delete - zone');
    }
    return store.removeZone(id);

}


async function deleteZoneFull(id) {

    let zone = await store.findzone(id)
    //console.log(zone[0]._id)
    await controller_device.deleteManyDevice(id)

    await controller_emq.deleteUser(zone[0].idusername)

    return await store.removeZone(id)

}


module.exports = {
    addZone,
    listZones,
    updateZone,
    deleteZone,
    deleteZoneFull
}