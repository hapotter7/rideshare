var express =  require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlMain2 = require('../controllers/passenger');
var ctrlother = require('../controllers/others');
const { route } = require('../../app_server/routes');


// router.post('/ridePost', ctrlMain.createOne);
//router.get('/riderDetailsAll', ctrlMain.riderDetailsAll);

router.post('/contactus',ctrlother.contactus);
router.get('/recentRide',ctrlMain.getRidePost1);


router.get('/:pUser/bookRide/:_id', ctrlother.getRideInfo12);
router.post('/:pUser/bookRide/:RuserName/:_id',ctrlother.bookRideConfirm);


router.get('/:userName/rOrders',ctrlother.getRiderorders);
router.get('/:userName/rOrders1',ctrlother.getRiderorders1);

router.get('/:_id/details/:userName/:postId',ctrlother.getRiderOrderDetails);
//router.get('/:_id/pdetails/:userName/:postId',ctrlother.getRiderOrderDetails);
router.put('/:_id/update/:userName/:postId',ctrlother.updateStatus);
router.put('/:_id/update1/:userName/:postId',ctrlother.updateStatus1);

////////////
router.route('/createRider')
    .get(ctrlMain.getRidePost)
    .post(ctrlMain.createRider);

router.route('/riderDetails/')
    .get(ctrlMain.riderDetailsAll)
    .post(ctrlMain.getLoginDetails1);

router.get('/riderprofile/:userName',ctrlMain.getRiderProfile);

router.get('/:userName/ridePost', ctrlMain.getRidePost);

router.post('/createnewridepost',ctrlMain.createNewRidePost);


router.post('/createRideRequest',ctrlMain2.createRideRequest);

router.route('/createPassenger')
    .get(ctrlMain2.getRidePost)
    .post(ctrlMain2.createPassenger);

router.route('/passengerDetails/')
    .get(ctrlMain2.passengerDetailsAll)
    .post(ctrlMain2.getLoginDetails1);


router.get('/passengerprofile/:userName', ctrlMain2.getPassengerProfile);

router.get('/rideRequested', ctrlMain2.getRideRequested);



module.exports = router;