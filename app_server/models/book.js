var mongoose = require('mongoose');
const {required } = require('nodemon/lib/config');

var bookSchema = new mongoose.Schema({
    
    passengerUserName:{
        type:String,
        required:false
    },
    riderUserName:{
        type:String,
        required:false
    },
    postId: {
        type:String,
        required:false
    }
    // riderUserName:{
    //     type:String,
    //     required:true
    // },
    // from:{ 
    //     type: String,
    //     required:true
    // },
    // to: {
    //     type: String,
    //     required:true
    // },
    // time:{ 
    //     type: String,
    //     required:true
    // },
    // date: {
    //     type: String,
    //     required:true
    // },
    // seats:{ 
    //     type: Number,
    //     required:true
    // },
    ,status:{
         type: String,
         required:false
     }
})
mongoose.model('books',bookSchema);
