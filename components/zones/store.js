const Model = require('./model');

function addBooth(booth) {
    const myBooth = new Model(booth);
    return myBooth.save();
}

function listBooths() {
    return new Promise((resolve, reject) => {
        Model.find()
            .populate('user')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    })
}

function findzone(id) {
    return Model.find({_id:id}); 
}


async function updateZone(id, body) {
    const foundZone = await Model.findOne({
        _id: id
    });

    foundZone.campus = body.campus;
    foundZone.zone = body.zone;

    const newZone = await foundZone.save();
    return newZone;
}


function removeZone(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addBooth,
    list: listBooths,
    updateZone,
    removeZone,
    findzone
}