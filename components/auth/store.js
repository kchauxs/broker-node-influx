const Model = require('./model');

function insert(authData) {
    const myUserAuth = new Model(authData);
    return myUserAuth.save();
}


async function updateAuth(data) {
    const foundAuth = await Model.findOne({ id: data._id });

    foundAuth.username = data.username;
    foundAuth.password = data.password;

    const updateAuth = await foundAuth.save();
    return updateAuth
}


async function query(data) {

    const foundData = await Model.findOne(data);

    return foundData;

}




module.exports = {
    insert,
    updateAuth,
    query
}