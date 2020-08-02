const fetch = require('node-fetch');
const config = require('../../config')
const store = require('./store');
const sha256 = require('js-sha256');
const nanoid = require('nanoid');

async function users() {
    let e = await fetch(config.emqApi.host + "/api/v4/users/", {
        "method": "GET",
        "headers": {
            "authorization": config.emqApi.user
        }
    })

    return e.json()
}

async function infoNode() {
    let e = await fetch(config.emqApi.host + "/api/v4/brokers/udla@127.0.0.1", {
        "method": "GET",
        "headers": {
            "authorization": config.emqApi.user
        }
    })

    return e.json()
}

async function allClients() {
    let e = await fetch(config.emqApi.host + "/api/v4/clients/", {
        "method": "GET",
        "headers": {
            "authorization": config.emqApi.user
        }
    })

    return e.json()
}

async function perClientid(id) {
    let e = await fetch(config.emqApi.host + "/api/v4/clients/" + id, {
        "method": "GET",
        "headers": {
            "authorization": config.emqApi.user
        }
    })

    return e.json()
}
async function metrics() {
    let e = await fetch(config.emqApi.host + "/api/v4/metrics/", {
        "method": "GET",
        "headers": {
            "authorization": config.emqApi.user
        }
    })

    return e.json()
}

async function routes() {
    let e = await fetch(config.emqApi.host + "/api/v4/routes/", {
        "method": "GET",
        "headers": {
            "authorization": config.emqApi.user
        }
    })

    return e.json()
}
async function stats() {
    let e = await fetch(config.emqApi.host + "/api/v4/stats/", {
        "method": "GET",
        "headers": {
            "authorization": config.emqApi.user
        }
    })

    return e.json()
}
async function subscriptions() {
    let e = await fetch(config.emqApi.host + "/api/v4/subscriptions/", {
        "method": "GET",
        "headers": {
            "authorization": config.emqApi.user
        }
    })

    return e.json()
}

async function subscriptionsbyId(id) {
    let e = await fetch(config.emqApi.host + "/api/v4/subscriptions/" + id, {
        "method": "GET",
        "headers": {
            "authorization": config.emqApi.user
        }
    })

    return e.json()
}



function publish(data) {

    return fetch(config.emqApi.host + "/api/v4/mqtt/publish/", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "authorization": config.emqApi.user
        },
        "body": data
    })



}

function listusers() {
    return store.listusers();
}



async function addusername(data) {

    const client = {

        username: data.username,
        password: await sha256(data.password),
        is_superuser: data.is_superuser,
        salt: data.salt
    }
    return await store.addusername(client);
}



async function addRandomUser(zone) {
   
    let pass = nanoid.nanoid()

    const client = {

        username: zone+'_'+nanoid.nanoid(),
        password: await sha256(pass),
        is_superuser: false,
        salt: ''
    }

    let newclient = await store.addusername(client);
    newclient.password = pass
    
    return newclient
}

function deleteUser(id) {
 
    if (!id) {
        return Promise.reject('Invalid Delete - zone');
    }
    return store.deleteUser(id);

}



module.exports = {
    users,
    stats,
    routes,
    metrics,
    publish,
    infoNode,
    allClients,
    perClientid,
    subscriptions,
    subscriptionsbyId,
    listusers,
    addusername,
    addRandomUser,
    deleteUser

}

