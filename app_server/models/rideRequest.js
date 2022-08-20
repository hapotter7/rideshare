var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

var rideRequestSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    from:{ 
        type: String,
        required:true
    },
    to: {
        type: String,
        required:true
    },
    time:{ 
        type: String,
        required:true
    },
    date: {
        type: String,
        required:true
    },
    seatsRequired:{ 
        type: Number,
        required:true
    },
    status:{
        type: String,
        required:true
    }
})
mongoose.model('RideRequests',rideRequestSchema);
