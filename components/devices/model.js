const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name :{
        type:String,
        unique:true,
        required:true
    },
    zone:{
        type: Schema.ObjectId,
        ref: 'Zone',
        required:true
    },
    state:{
        type:Boolean,
        default: false
    },
    date: { type: Date, default: Date.now }
});

const model = mongoose.model('Device', mySchema);
module.exports = model;
