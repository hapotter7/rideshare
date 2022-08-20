var express = require('express');
const multer = require('multer');
var router = express.Router();
var path = require('path');
const ctrlmain = require('../controllers/main');
const ctrlpassenger = require('../controllers/passenger');
const ctrlothers = require('../controllers/others');

router.use(express.static(__dirname+"./public/"));

var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename(req,file,cb){
        cb(null,file.filename+"_"+Date.now()+path.extname(file.originalname));
    }

}) 
var upload = multer({
    storage: Storage
}).single('file');

router.get('/',ctrlmain.recentRides);

// Signup and Login's

router.get('/signup',ctrlmain.signuppage);
router.get('/orderConfirm',ctrlothers.orderPage);

// router.get('/passengerSignUp',ctrlpassenger.passengerSignUp);

router.get('/about',ctrlothers.aboutPage);


// router.get('/contact',ctrlothers.contactPage);
// router.post('/contact',ctrlothers.abcd);


router.route('/contact')
    .get(ctrlothers.contactPage)
    .post(ctrlothers.abcd);



router.get('/:userName/rOrders',ctrlothers.rorderDetails);
router.get('/:_id/details/:userName/:postId',ctrlothers.rorderDetails1);
router.get('/:_id/pdetails/:userName/:postId/:status',ctrlothers.porderDetails1);

router.get('/:_id/details1/:userName/:postId',ctrlothers.up);
router.get('/:_id/details2/:userName/:postId',ctrlothers.up1);

router.get('/rdashboard',ctrlmain.rDashboardPage);
router.get('/riderprofile/:userName',ctrlmain.getRiderDetails);


router.get('/passengerprofile/:userName',ctrlpassenger.getPassengerDetails);


///////////////////////////////////////


router.route('/createnewridepost/:userName')
    .get(ctrlmain.rendernewridepostpage)
    .post(ctrlmain.createNewRidePost);


router.route('/createnewrideRequest/:userName')
    .get(ctrlpassenger.rorderDetails12);

router.get('/:pUser/bookRide/:_id',ctrlothers.getRideInfo);
router.get('/:pUser/bookRide/:RuserName/:_id',ctrlothers.bookRidedb);



router.get('/:userName/ridePost',ctrlmain.ridesPost);
router.get('/rideRequested',ctrlpassenger.ridesRequested);

////////////////////////////

router.route('/riderSignUp')
    .get(ctrlmain.riderSignUppage)
    .post(upload,ctrlmain.createRider);


router.route('/passengerSignUp')
    .get(ctrlpassenger.passengerSignUp)
    .post(upload,ctrlpassenger.createPassenger);

router.route('/riderLogin')
    .get(ctrlmain.riderDetailsAll)
    .post(ctrlmain.riderLoginCheck);


router.route('/passengerLogin')
    .get(ctrlpassenger.passengerLoginpage)
    .post(ctrlpassenger.passengerLoginCheck)

module.exports = router;
