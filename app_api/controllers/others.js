const { response } = require('express');
var mongoose = require('mongoose');
var RidePost = mongoose.model('RidePosts');
var books = mongoose.model('books');
var contact = mongoose.model('contactUs');

const getRideInfo12 = function(req, res){
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
               .json(rideInfo);
               console.log(req.params.userName);}
               //console.log(rideInfo);}
  });    
};

   
const bookRideConfirm = function(req, res){
  books.create({
      
    passengerUserName: req.params.pUser,
    postId: req.params._id,
    riderUserName: req.params.RuserName,
    status: "Awaited",
    // riderUserName: req.body.userName,
    // from: req.body.from,
    // to: req.body.to,
    // time: req.body.time,
    // date: req.body.date,
    // seats: req.body.seats,
    // status: "Awaiting"

  }, (err, BookRideConfirm) => {
   if (err) {
       res
       .status(404)
       .json(err);
       console.log(err);
   } else {
       res
       .status(201)
       .json(BookRideConfirm);
  }
});  
}




const getRiderorders = function(req, res){
  books
  .find({riderUserName: req.params.userName})
  .exec((err, RiderOrder) => {
      if (!RiderOrder) {
          res
           .status(404)
           .json({"message": "No RIDES"});
           console.log(req.params.userName)
          }
          
          else if (err) {
              res
               .status(404)
               .json(err);
          }
          else{
             res
               .status(200)
               .json(RiderOrder);
               console.log(RiderOrder);}
      });  
  };

  const getRiderorders1 = function(req, res){
    books
    .find({passengerUserName: req.params.userName})
    .exec((err, RiderOrder) => {
        if (!RiderOrder) {
            res
             .status(404)
             .json({"message": "No RIDES"});
             console.log(req.params.userName)
            }
            
            else if (err) {
                res
                 .status(404)
                 .json(err);
            }
            else{
               res
                 .status(200)
                 .json(RiderOrder);
                 console.log(RiderOrder);}
        });  
    };
  




const getRiderOrderDetails = function(req, res){
  console.log(req.params.postId);
  RidePost
  .findOne({_id: req.params.postId})
  .exec((err, RiderOrderDetails) => {
      if (!RiderOrderDetails) {
          res
           .status(404)
           .json({"message": "Ride not found"});
          }
          
          else if (err) {
              res
               .status(404)
               .json(err);
          }
          else{
             res
               .status(200)
               .json(RiderOrderDetails);
               console.log(RiderOrderDetails);}
      });  
  };






   
  const contactus = function(req, res){
    contact.create({
        
      Name: req.body.Name,
      phone: req.body.phone,
      message: req.body.message,
  
    }, (err, contactConfirm) => {
     if (err) {
         res
         .status(404)
         .json(err);
         console.log(err);
     } else {
         res
         .status(201)
         .json(contactConfirm);
    }
  });  
  }



const updateStatus = function(req, res){
    console.log(req.params._id);
    if (!req.params._id){
        res
        .status(404)
        .json({
            "message" : "Not found"
        });
    return;
    }
    books.findById(req.params._id)
        .exec((err, updateData) => {
            if (!updateData) {
                res
                .status(404)
                .json({
                    "message" : "Ride Booking not found"
                });
            return;    
            } else if(err) {
                res
                .status(404)
                .json(err);
                console.log(err);
                return;
            }
            console.log(updateData);

              updateData.status = req.body.status;

              updateData.save((err,updateData) => {
                if (err) {
                  res
                  .status(404)
                  .json(err);
              }else {
                  res
                  .status(204)
                  .json(updateData);
              }});
            });};


            const updateStatus1 = function(req, res){
              console.log(req.params._id);
              if (!req.params._id){
                  res
                  .status(404)
                  .json({
                      "message" : "Not found"
                  });
              return;
              }
              books.findById(req.params._id)
                  .exec((err, updateData) => {
                      if (!updateData) {
                          res
                          .status(404)
                          .json({
                              "message" : "Ride Booking not found"
                          });
                      return;    
                      } else if(err) {
                          res
                          .status(404)
                          .json(err);
                          console.log(err);
                          return;
                      }
                      console.log(updateData);
          
                        updateData.status = req.body.status;
          
                        updateData.save((err,updateData) => {
                          if (err) {
                            res
                            .status(404)
                            .json(err);
                        }else {
                            res
                            .status(204)
                            .json(updateData);
                        }});
                      });};
          














module.exports = {
  getRideInfo12,bookRideConfirm,getRiderOrderDetails,getRiderorders,contactus,updateStatus,updateStatus1,getRiderorders1
}
