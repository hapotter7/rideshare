const src = require("debug");
const request = require('request');
const mongoose = require('mongoose');
const passengers = mongoose.model('passengers');
let alert = require('alert');

const apiOptions = {
  server: 'http://localhost:3000'
  };

// this will create rider in database without rides yet.

const createPassenger = function (req, res) {
  
    const path =`/api/createPassenger`;
  
    const postdata = {
        userName: req.body.userName,
        password: req.body.password,
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        govId: req.body.govId,
        stAddress: req.body.stAddress,
        city: req.body.city,
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
    res.redirect('/passengerLogin');
  }
  });
  };
  
  
  
  
  const passengerLoginpage = function(req, res, responseBody) {
    console.log(responseBody);
    res.render('passengerLogin',{
      passengerDetailsAll: responseBody,
      title: "PASSENGER LOGIN"});
    };
  
    const passengerDetailsAll = function(req,res){
      const path = '/api/passengerDetails';
      const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
       };
       request(
         requestOptions,
         (err,response,body) => {
           passengerLoginpage(req,res, body);
         }
       );
    };
  
    
  
    const passengerLoginCheck = function (req, res) {
    
      const path ='/api/passengerDetails';
    
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
      pDashboardPage(req,res,body);
    }
    });
    };
  
    

    const renderPassengerProfile = function(req, res, responseBody) {
        res.render('passengerProfile',{
          passengerProfile: responseBody})};
      
      
      
        const getPassengerDetails = function(req,res){
          const path = `/api/passengerprofile/${req.params.userName}`;
          const requestOptions = {
            url: apiOptions.server + path,
            method: 'GET',
            json: {}
           };
           request(
             requestOptions,
             (err,response,body) => {
               renderPassengerProfile(req,res, body);
             }
           );
        };
      

const rendernewriderequestpage = function(req, res, responseBody) {
    console.log(responseBody);
    console.log(req.params.userName);
    res.render('rideRequest',{
      rOrderDetails1:responseBody
    })};
          
          
      const rorderDetails12 = function(req,res){
        const path = `/api/${req.params.userName}/rOrders1`;
        const requestOptions = {
          url: apiOptions.server + path,
          method: 'GET',
          json: { }
         };
         request(
           requestOptions,
           (err,response,body) => {
            rendernewriderequestpage(req,res, body);
           }
         );
      };


// this controllers will use api and get methods to show all the rides requested. 


const renderRideRequestpage = function(req, res, responseBody) {
    console.log(responseBody);
    res.render('rideRequestList', {
          ridesRequest: responseBody
      });
    };
  
  
    const ridesRequested = function(req,res){
      const path = '/api/rideRequested';
      const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
       };
       request(
         requestOptions,
         (err,response,body) => {
           renderRideRequestpage(req,res, body);
         }
       );
    };
  
  
  // ------------------------------------------------------------------------------------------------------
  
  
  // ------------------------------------------------------------------------------------------------------
  
  // this will create rider in database without rides yet.
  
  const createRideRequest = function (req, res) {
    
    const path =`/api/createRideRequest`;
  
    const postdata = {
      userName: req.params.userName,
      from: req.body.from,
      to: req.body.to,
      time: req.body.time,
      date: req.body.date,
      seatsRequired: req.body.seatsRequired,
      status: "Awaiting"
      }
  console.log(postdata);
  const requestOptions = {
  url: apiOptions.server + path,
  method: 'POST',
  json: postdata
  };
  
  request( requestOptions, (err, response, body) => {
  if (response.statusCode == 201){
    pDashboardPage(req,res, body);
  }
  });
  };
  
  // Passenger DASHBOARD PAGE 
    const pDashboardPage = function(req, res, responseBody) {
    res.render('passengerDashboard', {
      passengerDetailsAll: responseBody,
      title: "RideShare"});
    };

  // PASSENGER SIGN UP
    const passengerSignUp = function(req, res, responseBody) {
    console.log(responseBody);
    res.render('passengerSignUp', {title: "PASSENGER SIGN UP Share"});
    };
  
    module.exports = { 
        pDashboardPage,
        passengerSignUp,
        createRideRequest,
        ridesRequested,
        passengerLoginCheck,
        createPassenger,
        passengerDetailsAll,
        passengerLoginpage,
        getPassengerDetails,
        rendernewriderequestpage,
        rorderDetails12
        
    }