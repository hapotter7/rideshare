const { response } = require('express');
var mongoose = require('mongoose');
const multer = require('multer');
var RidePost = mongoose.model('RidePosts');
var RideRequest = mongoose.model('RideRequests');
var Rider = mongoose.model('riders');
var Passenger = mongoose.model('passengers');




const getRidePost1 = function(req, res){
    RidePost.find().exec(function (err, RidePostdata1){
        if (err) {
            res
            .status(404)
            .json(err);
        return;
        }
        res
        .status(200)
        .json(RidePostdata1);
    });
};

// this controllers will use api and get methods to show all the rides posted from the collection named ride posted. 

const getRidePost = function(req, res){
    RidePost.find().exec(function (err, RidePostdata){
        if (err) {
            res
            .status(404)
            .json(err);
        return;
        }
        res
        .status(200)
        .json(RidePostdata);
    });
};
// this controllers will use api and get methods to show all the rides requested from the collection named ride reqesteded. 

const getRideRequested = function(req, res){
    RideRequest.find().exec(function (err, RideRequesteddata){
        if (err) {
            res
            .status(404)
            .json(err);
        return;
        }
        res
        .status(200)
        .json(RideRequesteddata);
    });
};



////////////////////////////////////////////

      
const createRider = function(req, res){
    
    Rider.create({
        
        userName: req.body.userName,
        password: req.body.password,
        
        details: {
        name: req.body.filename,
        contact: req.body.contact,
        email: req.body.email,
        dl_id: req.body.dl_id,
        stAddress: req.body.stAddress,
        city: req.body.city,
        vehicle: req.body.vehicle,
        vehicleNumber: req.body.vehicleNumber,
        
        },
        photo:{
            file: req.body.image
        }
    }
    
    ,(err, Riderdata) => {
     if (err) {
         res
         .status(404)
         .json(err);
         console.log(Riderdata);
     } else {
         res
         .status(201)
         .json(Riderdata);
         console.log(Riderdata);
         
    }
 });  
}
      
const createNewRidePost = function(req, res){
    RidePost.create({
        
        userName: req.body.userName,
        from: req.body.from,
        to: req.body.to,
        time: req.body.time,
        date: req.body.date,
        seatsAvailable: req.body.seatsAvailable,
        price: req.body.price
    }, (err, RidePostdata) => {
     if (err) {
         res
         .status(404)
         .json(err);
     } else {
         res
         .status(201)
         .json(RidePostdata);
    }
 });  
}

const riderDetailsAll = function(req, res){
    Rider.find().exec(function (err, riderDetailsAll){
        if (err) {
            res
            .status(404)
            .json(err);
        return;
        }
        res
        .status(200)
        .json(riderDetailsAll);
    });
};


const getLoginDetails1 = function(req, res){
    console.log(req.body.userName);
    Rider
    .findOne({userName: req.body.userName})
    //.find(req.body.userName)
    .exec((err, RiderLoginData1) => {
        if (!RiderLoginData1) {
            console.log('errorrrrrr');
             res
            .status(404)
            .json({
                    "message": "Item not found"
                });
        } else if (err) {
            console.log('errorrrrrr 401');
             res
             .status(404)
             .json(err);
        }else 
        {
            if(RiderLoginData1.password == req.body.password)
            {
                res
                 .status(200)
                 .json(RiderLoginData1);
                console.log(RiderLoginData1);
             }
        
            else
            {
                res    
                 .status(404)
                 .json({ "message": "password is wrong" });
                console.log("wrong password");
            }
        };
    });  
};


const getRiderProfile = function(req, res){
    //console.log(userName);
    Rider
    .findOne({userName: req.params.userName})
    .select('details , photo')
    .exec((err, riderProfile) => {
        if (!riderProfile) {
            res
             .status(404)
             .json({"message": "Rider not found"});
            }
            
            else if (err) {
                res
                 .status(404)
                 .json(err);
            }
            else{
               res
                 .status(200)
                 .json(riderProfile);
                 console.log(riderProfile);}
        });  
    };


module.exports = {
    getRidePost,
    getRidePost1,
    getRideRequested,
    createRider,

    createNewRidePost,
 
    getLoginDetails1,
    riderDetailsAll,
    getRiderProfile
}