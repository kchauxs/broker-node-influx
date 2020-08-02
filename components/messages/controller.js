const store = require('./store');

function addMessage(zone, card, temp, occupation) {
    return new Promise((resolve, reject) => {
        if (!zone || !card || !temp) {
            reject('Los datos son incorrectos v:');
            return false;
        }

        const fullMessage = {
            zone: zone,
            card: card,
            temp: temp,
            occupation: occupation,
        };

        resolve(store.add(fullMessage));
    });
}

function getMessages() {
    return store.list();
}

function getMessagesbyzone(filterZone) {
    return new Promise((resolve, reject) => {
        resolve(store.listbyzone(filterZone));
    })
}

function getMessagesCountZone(filterZone) {
    let filter = {};
    if (!filterZone) {
        return Promise.reject('[Invalid Count by zone]');
    }
    filter = { zone: filterZone };
    return store.listCountzone(filter)
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {

        if (!id || !message) {
            reject('Invalid data');
            return false;
        }

        const result = await store.updateMessage(id, message);

        resolve(result);
    })
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Id invalido');
            return false;
        }

        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    });
}
//-----------------------INFLUXDB--------------------------------------------

function addMessageInflux(zone, clientid, card, temp, occupation) {
    return new Promise((resolve, reject) => {
        if (!zone || !clientid || !card || !temp) {
            reject('Los datos son incorrectos v:');
            return false;
        }
        const fullMessage = {
            zone: zone,
            device: clientid,
            identification: card,
            temp: Number(temp),
            occupation: "ESTUDIANTE",
        };
        resolve(store.addMessageInflux(fullMessage));
    });
}

function countbyallzones() {
    return store.countbyallzones()
}

function countbyalldevices() {
    return store.countbyalldevices()
}

function countbytime(query) {
    if (!query) {
        return Promise.reject('[Invalid Count by zone]');
    }
    return store.countbytime(query)
}

function consultbydevicezoneintime(query) {
    if (!query) {
        return Promise.reject('[Invalid Count by zone/device]');
    }
    return store.consultbydevicezoneintime(query)
}

module.exports = {
    addMessage,
    getMessages,
    getMessagesbyzone,
    updateMessage,
    deleteMessage,
    getMessagesCountZone,
    addMessageInflux,
    countbytime,
    countbyallzones,
    consultbydevicezoneintime,
    countbyalldevices
};