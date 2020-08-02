const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    campus:{
        type:String,
        minlength:5,
        uppercase: true,
        required:true,
    },
    user:{
        type: Schema.ObjectId,
        ref: 'User',
        required:true
    },
    idusername:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    zone:{
        type: String,
        minlength:5,
        unique:true,
        required:true
    },
    date: { type: Date, default: Date.now }
});

const model = mongoose.model('Zone', mySchema);
module.exports = model; 