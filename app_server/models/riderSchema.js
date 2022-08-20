var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

var ridesPostSchema = new mongoose.Schema({
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
})

var riderDetailsSchema = new mongoose.Schema({
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
    dl_id: {
        type: String,
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
    vehicle:{ 
        type: String,
        required:false
    },
    vehicleNumber: {
        type: String,
        required:false
   
}
    
})
var riderpic= new mongoose.Schema({
    
    file: { 
        type: String,
        required:false
    }
        
})

var riderSchema = new mongoose.Schema({
    userName:{ 
        type: String,
        required:false
    },
    password: {
        type: String,
        required:false
    },
    details:[riderDetailsSchema],
    photo:[riderpic],
    rides:[ridesPostSchema]
})


mongoose.model('riders',riderSchema);