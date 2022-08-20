const src = require("debug");
const request = require('request');
const mongoose = require('mongoose');
const riders = mongoose.model('riders');
let alert = require('alert');




const apiOptions = {
  server: 'http://localhost:3000'
  };



// HOME PAGE 
const Homepage = function(req, res, responseBody) {
  res.render('index', { ridesPost1: responseBody,
    title: "RideShare"});
  };



  const recentRides = function(req,res){
    const path = '/api/recentRide';
    const requestOptions = {
      url: apiOptions.server + path,
      method: 'GET',
      json: {}
     };
     request(
       requestOptions,
       (err,response,body) => {
        console.log(body);
         Homepage(req,res, body);
       }
     );
  };




// SIGN UP PAGE 
const signuppage = function(req, res, responseBody) {
  console.log(responseBody);
  res.render('signup', {title: "Sign UP"});
  };



// RIDER DASHBOARD PAGE 
const rDashboardPage = function(req, res, responseBody) {
  res.render('riderDashboard', {
    riderDetailsAll: responseBody,
    title: "RideShare"});
  };




const riderLoginpage = function(req, res, responseBody) {
  console.log(responseBody);
  res.render('riderLogin',{
    riderDetailsAll: responseBody,
    title: "RIDER LOGIN"});
  };



  const riderDetailsAll = function(req,res){
    const path = '/api/riderDetails';
    const requestOptions = {
      url: apiOptions.server + path,
      method: 'GET',
      json: {}
     };
     request(
       requestOptions,
       (err,response,body) => {
         riderLoginpage(req,res, body);
       }
     );
  };


  ////////// above code is  working//


  const renderRiderProfile = function(req, res, responseBody) {
  res.render('updateRider',{
    riderProfile: responseBody,
  title: "RideShare"})};



  const getRiderDetails = function(req,res){
    const path = `/api/riderprofile/${req.params.userName}`;
    const requestOptions = {
      url: apiOptions.server + path,
      method: 'GET',
      json: {}
     };
     request(
       requestOptions,
       (err,response,body) => {
         renderRiderProfile(req,res, body);
       }
     );
  };


  const riderLoginCheck = function (req, res) {
  
    const path ='/api/riderDetails';
  
    const postdata = {
        userName: req.body.userName,
        password: req.body.password,
        }
  console.log(postdata);
  const requestOptions = {
  url: apiOptions.server + path,
  method: 'POST',
  json: postdata
  };
  
  request( requestOptions, (err, response, body) => {
  if (response.statusCode == 200){
    rDashboardPage(req,res,body);
  }
  });
  };



// RIDER SIGN UP 
const riderSignUppage = function(req, res, responseBody) {
  console.log(responseBody);
  res.render('riderSignUp', {title: "RIDER SIGN UP"});
  };

// Ride Post List PAGE

// this controllers will use api and get methods to show all the rides posted. 

const renderRidePostpage = function(req, res, responseBody) {
  console.log(responseBody);
  res.render('list-display', {
        ridesPost: responseBody,
        pUser: req.params.userName
        
    });
  };


  const ridesPost = function(req,res){
    const path = '/api/:userName/ridePost';
    const requestOptions = {
      url: apiOptions.server + path,
      method: 'GET',
      json: {}
     };
     request(
       requestOptions,
       (err,response,body) => {
        console.log(body);
         renderRidePostpage(req,res, body);
       }
     );
  };

// Ride Request List PAGE

// this will create rider in database without rides yet.

const createRider = function (req, res) {
  
  const path =`/api/createRider`;

  const postdata = {
      userName: req.body.userName,
      password: req.body.password,
      name: req.body.name,
      contact: req.body.contact,
      email: req.body.email,
      dl_id: req.body.dl_id,
      stAddress: req.body.stAddress,
      city: req.body.city,
      vehicle: req.body.vehicle,
      vehicleNumber: req.body.vehicleNumber,
      image: req.file.filename
    }
    console.log(postdata);
const requestOptions = {
url: apiOptions.server + path,
method: 'POST',
json: postdata
};

request( requestOptions, (err, response, body) => {
if (response.statusCode == 201){
  res.redirect('/riderLogin');
}
});
};

const rendernewridepostpage = function(req, res, responseBody) {
  console.log(responseBody);
  console.log(req.params.userName);
  res.render('ridepost')};




// this will create rider in database without rides yet.

const createNewRidePost = function (req, res) {
  
  const path =`/api/createnewridepost`;
  const postdata = {
      userName: req.params.userName,
      from: req.body.from,
      to: req.body.to,
      time: req.body.time,
      date: req.body.date,
      seatsAvailable: req.body.seatsAvailable,
      price: req.body.price
    }
console.log(postdata);
const requestOptions = {
url: apiOptions.server + path,
method: 'POST',
json: postdata
};

request( requestOptions, (err, response, body) => {
if (response.statusCode == 201){
  rDashboardPage(req,res, body);
}
});
};

module.exports = {
 riderLoginpage,
 Homepage,
 recentRides,
 signuppage,
 riderLoginpage,
 riderSignUppage,
 ridesPost,
 renderRidePostpage,
 createRider,
 createNewRidePost,
 riderDetailsAll,
 riderLoginCheck,
 rDashboardPage,
 getRiderDetails,
 rendernewridepostpage,
}