const Model = require('./model');

function listusers() {
    return Model.find();
}

function addusername(client) {
    const myclient= new Model(client);
    return myclient.save();
}

function deleteUser(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {

    listusers,
    addusername,
    deleteUser

}