var mongoose = require('mongoose');
const {required } = require('nodemon/lib/config');

var contactSchema = new mongoose.Schema({
    
    Name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    message: {
        type:String,
        required:true
    
    }})
mongoose.model('contactUs',contactSchema);
