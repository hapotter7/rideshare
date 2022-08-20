var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');


var citySchema = new mongoose.Schema({
    city:{ 
        type: String,
        required:true
    }
})


var provinceSchema = new mongoose.Schema({
    province:{ 
        type: String,
        required:true
    ,
    city:[citySchema]}
})


var countrySchema = new mongoose.Schema({

    country:{
        type: String,
       required: true
    },
    province:[provinceSchema]
    
   
});


mongoose.model('Menus',mainSchema);