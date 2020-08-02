const bcrypt = require('bcrypt');
const store = require('./store')
const auth = require('../../auth');



async function login(username, password) {

    const data = await store.query({ username: username });

    return bcrypt.compare(password, data.password)
        .then(sonIguales => {
            if (sonIguales === true) {
                // Generar token;
                return {
                    token: auth.sign({
                        username: data.username,
                        date: data.date
                    }), id: data.id
                }

                /*
                return auth.sign({
                    id:data.id,
                    username: data.username,
                    date: data.date
                })
                */
            } else {
                throw new Error('Informacion invalida');
            }
        });
}

async function insert(data) {
    const authData = {
        id: data.id,
    }

    if (data.username) {
        authData.username = data.username;
    }

    if (data.password) {
        authData.password = await bcrypt.hash(data.password, 5);

    }
    //console.log(authData)

    return store.insert(authData);
}

async function update(data, password) {
    data.password = await bcrypt.hash(password, 5);
    return store.updateAuth(data)
}


module.exports = {
    login,
    insert,
    update
};
