const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
        ref: 'User',
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date: { type: Date, default: Date.now }
});

const model = mongoose.model('Auth', mySchema);
module.exports = model;
