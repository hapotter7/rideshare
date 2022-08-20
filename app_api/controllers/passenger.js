const { response } = require('express');
var mongoose = require('mongoose');
const multer = require('multer');
var RidePost = mongoose.model('RidePosts');
var RideRequest = mongoose.model('RideRequests');
var Passenger = mongoose.model('passengers');
let alert = require('alert');



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


      
const createPassenger = function(req, res){
    Passenger.create({
        
        userName: req.body.userName,
        password: req.body.password,
        
        details: {
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        govId: req.body.govId,
        stAddress: req.body.stAddress,
        city: req.body.city,
        },
        photo:{
            file: req.body.image
        }

    }
    , (err, Passengerdata) => {
     if (err) {
         res
         .status(404)
         .json(err);
         console.log("errorrrr" + Passengerdata)
     } else {
         res
         .status(201)
         .json(Passengerdata);
    }
 });  
}

      
const createRideRequest = function(req, res){
    RideRequest.create({
        
        userName: req.body.userName,
        from: req.body.from,
        to: req.body.to,
        time: req.body.time,
        date: req.body.date,
        seatsRequired: req.body.seatsRequired,
        status: req.body.status

    }, (err, RideRequestdata) => {
     if (err) {
         res
         .status(404)
         .json(err);
     } else {
         res
         .status(201)
         .json(RideRequestdata);
    }
 });  
}

const passengerDetailsAll = function(req, res){
    Passenger.find().exec(function (err, passengerDetailsAll){
        if (err) {
            res
            .status(404)
            .json(err);
        return;
        }
        res
        .status(200)
        .json(passengerDetailsAll);
    });
};


const getLoginDetails1 = function(req, res){
    console.log(req.body.userName);
    Passenger
    .findOne({userName: req.body.userName})
    //.find(req.body.userName)
    .exec((err, PassengerLoginData1) => {
        if (!PassengerLoginData1) {
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
             alert
        }else 
        {
            if(PassengerLoginData1.password == req.body.password)
            {
                res
                 .status(200)
                 .json(PassengerLoginData1);
                console.log(PassengerLoginData1);
             }
        
            else
            {
                res    
                 .status(404)
                 .json({ "message": "password is wrong"});
                console.log("wrong password");
            }
        };
    });  
};


const getPassengerProfile = function(req, res){
    //console.log(userName);
    Passenger
    .findOne({userName: req.params.userName})
    .select('details , photo')
    .exec((err, passengerProfile) => {
        if (!passengerProfile) {
            res
             .status(404)
             .json({"message": "Passenger not found"});
            }
            
            else if (err) {
                res
                 .status(404)
                 .json(err);
            }
            else{
               res
                 .status(200)
                 .json(passengerProfile);
                 console.log(passengerProfile);}
        });  
    };


    const getRideInfo1 = function(req, res){
        RidePost
        .findOne({_id: req.params._id})
        .exec((err, rideInfo) => {
            if (!rideInfo) {
                res
                 .status(404)
                 .json({"message": "Ride not found"});
                 console.log(rideInfo)
                }
                
                else if (err) {
                    res
                     .status(404)
                     .json(err);
                     console.log(rideInfo)
                }
                else{
                   res
                     .status(200)
                     .json(rideInfo);}
        });    
      };

module.exports = {
    createRideRequest,
    createPassenger,
    getRidePost,
    getPassengerProfile,
    passengerDetailsAll,
    getRideRequested,
    getLoginDetails1,
    getRideInfo1
}