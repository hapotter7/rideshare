var mongoose = require('mongoose');
var dbURI= 'mongodb+srv://tayal:125001@dbms22.lvjqc.mongodb.net/RideDB?retryWrites=true&w=majority';
var gracefulShutdown;

mongoose.connect(dbURI,
    {
        dbName: 'RidesDB',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    },{useMongoClient: true}
);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});
require('./passengerSchema');
require('./ridepost');
require('./rideRequest');
require('./riderSchema');
require('./book');
require('./contactus');