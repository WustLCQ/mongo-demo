const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to mongodb://localhost:27017/student');
});

mongoose.connection.on('error', e => {
    console.log('Mongoose default connection error ' + e);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection closed through app termination');
        process.exit(0);
    });
});

exports.init = function () {
    mongoose.connect('mongodb://localhost:27017/student', { useNewUrlParser: true });
};
