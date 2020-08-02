const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    zone: {
        type: Schema.ObjectId,
        ref: 'Zone',
        required:true
    },
    card: { 
        type: String,
        required:true
    },
    temp: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        uppercase: true,
        default: 'ESTUDIANTE',
        required: true
    },
    date: { type: Date, default: Date.now }
});

const model = mongoose.model('Message', mySchema);
module.exports = model;