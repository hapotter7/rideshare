const src = require("debug");
const request = require('request');
const mongoose = require('mongoose');
const riders = mongoose.model('riders');
const books = mongoose.model('books');
let alert = require('alert');

const apiOptions = {
  server: 'http://localhost:3000'
  };




// ABOUT PAGE 
const aboutPage = function(req, res, responseBody) {
  res.render('about', {title: "About RideShare"});
  };

  const orderPage = function(req, res, responseBody) {
    res.render('orderConfirm', {title: "RideShare"});
    };


// CONTACT PAGE 
const contactPage = function(req, res, responseBody) {
 res.render('contact', {title: "RideShare- Contact"});
  };

  // BOOK PAGE 
const bookRide = function(req, res, responseBody) {
  res.render('bookRide',{
    rideInfo: responseBody,
    pUser: req.params.pUser,
    postId:req.params._id
  })};
  
    const getRideInfo = function(req,res){
      const path = `/api/:pUser/bookRide/${req.params._id}`;
      const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
       };
       request(
         requestOptions,
         (err,response,body) => {
          
          bookRide(req,res, body);
         }
       );
    };
  

    const bookRidedb = function (req, res) {
      console.log(req.params.RuserName);
      const path =`/api/${req.params.pUser}/bookRide/${req.params.RuserName}/${req.params._id}`;
    
      const postdata = {
        
          passengerUserName: req.params.pUser,
          postId: req.params._id,
          riderUserName: req.params.RuserName,
        //   from: req.body.from,
        //   to: req.body.to,
        //   time: req.body.time,
        //   date: req.body.date,
        //   seats: req.body.seats,
        //   status: "Awaiting"
        }
        console.log(postdata);
    const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: postdata
    };
    
    request( requestOptions, (err, response, body) => {
    if (response.statusCode == 201){
      res.redirect(`/createnewrideRequest/${req.params.pUser}`);
    }
    });
    };
    



    const renderRiderOrderPage = function(req, res, responseBody) {
      console.log(responseBody);
     
      res.render('rOrders',{
        rOrderDetails: responseBody,
        title: "RIDER LOGIN"});
      };
    
    
    
      const rorderDetails = function(req,res){
        const path = `/api/${req.params.userName}/rOrders`;
        const requestOptions = {
          url: apiOptions.server + path,
          method: 'GET',
          json: { }
         };
         request(
           requestOptions,
           (err,response,body) => {
            renderRiderOrderPage(req,res, body);
           }
         );
      };

      




      const renderRiderOrderPage1 = function(req, res, responseBody) {
        console.log(responseBody);
        res.render('rOrdersdetails',{
          rOrderDetails1: responseBody,
          postId:req.params.postId,
          _id:req.params._id,
          userName:req.params.userName,
          title: "RIDER LOGIN"});
          console.log(req.params._id);
        };
      
      
      
        const rorderDetails1 = function(req,res){
          const path = `/api/${req.params._id}/details/${req.params.userName}/${req.params.postId}`;
          const requestOptions = {
            url: apiOptions.server + path,
            method: 'GET',
            json: {}
           };
           request(
             requestOptions,
             (err,response,body) => {
              renderRiderOrderPage1(req,res, body);
             }
           );
        };
  

        const renderPassengerOrderPage1 = function(req, res, responseBody) {
          console.log(req.params.status);
          if(req.params.status == 'confirmed'){
            message1 = "Your ride is confirmed"
          }
          else if(req.params.status == 'Declined'){
            message1 = "Your ride is Declined"
          }
          else{
            message1 = "Your ride is Awaited"
          }
          res.render('pOrdersdetails',{
            rOrderDetails1: responseBody,
            messageride:message1,
            title: "Passenger Rides"});
            console.log(req.params._id);
          };
        
        
        
          const porderDetails1 = function(req,res){
            const path = `/api/${req.params._id}/details/${req.params.userName}/${req.params.postId}`;
            const requestOptions = {
              url: apiOptions.server + path,
              method: 'GET',
              json: {}
             };
             request(
               requestOptions,
               (err,response,body) => {
                renderPassengerOrderPage1(req,res, body);
               }
             );
          };
    



const abcd = function (req, res) {
  
    const path ='/api/contactus';
        
          const postdata = {
              Name: req.body.name,
              phone: req.body.phoneNumber,
              message: req.body.freeform
              }
        console.log(postdata);

        const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
        };
        
        request( requestOptions, (err, response, body) => {
        if (response.statusCode == 201){
         alert("Thank you for Submitting your query.\n We will contact you shortly");
         res.redirect('/');
        }
        });
        };
      
      


        const up = function (req, res) {
  
          const path =`/api/${req.params._id}/update/${req.params.userName}/${req.params.postId}`;
              
                const postdata = {
                    _id: req.params._id,
                    status:"confirmed"
                    }
              console.log(postdata);
      
              const requestOptions = {
              url: apiOptions.server + path,
              method: 'PUT',
              json: postdata
              };
              
              request( requestOptions, (err, response, body) => {
              if (response.statusCode == 204){
               alert("Thank you for Confirming ride..\n Please contact Passenger shortly");
               res.redirect(`/${req.params.userName}/rOrders`);
              }
              });
              };
            
        const up1 = function (req, res) {
  
          const path =`/api/${req.params._id}/update1/${req.params.userName}/${req.params.postId}`;
              
                const postdata = {
                    _id: req.params._id,
                    status:"Declined"
                    }
              console.log(postdata);
      
              const requestOptions = {
              url: apiOptions.server + path,
              method: 'PUT',
              json: postdata
              };
              
              request( requestOptions, (err, response, body) => {
              if (response.statusCode == 204){
               alert("Declined status sent to Passenger");
               res.redirect(`/${req.params.userName}/rOrders`);
              }
              });
              };
            
      










 
  module.exports = {
    aboutPage, 
    contactPage, 
    bookRide,
    getRideInfo, 
    bookRidedb,
    orderPage,
    rorderDetails,
    rorderDetails1,
    abcd,
    up,
    up1,
    renderPassengerOrderPage1,
    porderDetails1
  
  };