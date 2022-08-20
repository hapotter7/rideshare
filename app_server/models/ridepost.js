var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

var ridePostSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:false
    },
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
    seatsAvailable:{ 
        type: Number,
        required:false
    },
    price:{
        type: Number,
        required:false
    }
});
mongoose.model('RidePosts',ridePostSchema);
