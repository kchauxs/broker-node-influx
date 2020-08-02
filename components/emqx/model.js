const mongoose = require('mongoose');
mongoose.pluralize(null);
const Schema = mongoose.Schema;

const mySchema = new Schema({
   
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_superuser:{
        type:Boolean,
        default:false
    },
    salt:{
        type:String,
        default:""
    }
});

const model = mongoose.model('mqtt_user', mySchema);
module.exports = model;
