const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name :{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    date: { type: Date, default: Date.now }
});

const model = mongoose.model('User', mySchema);
module.exports = model;
