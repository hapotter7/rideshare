var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');


var ridesRequestSchema = new mongoose.Schema({
    from:{ 
        type: String,
        required:false
    },
    to: {
        type: String,
        required:false
    },
    time:{ 
        type: String,
        required:false
    },
    date: {
        type: String,
        required:false
    },
    seatsrequired:{ 
        type: Number,
        required:false
    },
    status:{
        type: String,
        required:false
    }
})

var passengerDetailsSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required:false
    },
    email: {
        type: String,
        required:false
    },
    contact:{ 
        type: Number,
        required:false
    },
    stAddress:{ 
        type: String,
        required:false
    },
    city: {
        type: String,
        required:false
    },
    govId: {
        type: String,
        required:false
    },
})

var passengerpic= new mongoose.Schema({
    
    file: { 
        type: String,
        required:false
    }
        
})


var passengerSchema = new mongoose.Schema({
    userName:{ 
        type: String,
        required:false
    },
    password: {
        type: String,
        required:false
    },
    details:[passengerDetailsSchema],
    photo:[passengerpic],
})


mongoose.model('passengers',passengerSchema);