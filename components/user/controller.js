const store = require('./store');

async function addUser(body) {
    if (!body.name) {
        return Promise.reject('Invalid name');
    }

    const user = {
        name: body.name,
        username: body.username,
    };

    return store.add(user)

}


function updateUser(body) {

    return new Promise(async (resolve, reject) => {

        if (!body.id || !body.name || !body.username || !body.password) {
            reject('[controller] - Invalid data');
            return false;
        }

        const result = await store.updateUser(body);

        resolve(result);
    })
}


function listUsers() {
    return store.list();
}

module.exports = {
    addUser,
    listUsers,
    updateUser
}

