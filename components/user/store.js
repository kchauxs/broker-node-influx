const Model = require('./model');


function addUser(user) {
    const myUser = new Model(user);
    return myUser.save();
}


function listUsers() {
    return Model.find();
}

async function updateUser(user) {
    const foundUser = await Model.findOne({_id:user.id});

    foundUser.name = user.name;
    foundUser.username = user.username;

    const updateUser = await foundUser.save();
    
    return updateUser;
}

module.exports = {
    add: addUser,
    list: listUsers,
    updateUser
}