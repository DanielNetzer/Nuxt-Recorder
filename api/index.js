const express = require('express');
const mongoose = require('mongoose');

//Set up mongoose connection
// TODO: Talk with Michael, unable to connect to mongoose!
// const mongoConnString = 'mongodb://sensiya:P@ssw0rd@54.196.118.71:27017/recordings';
mongoose.connect('mongodb://172.131.7.56:27017/recordings', { user: 'sensiya', pass: 'P@ssw0rd' }, (err) => {
    throw new Error(`MongoDB Error, ${err}`);
});

mongoose.connection.on('error', (err) => {
    throw new Error(`MongoDB Error, ${err}`);
});

// Create express instnace
const app = express();

// Require API routes
const sentences = require('./routes/sentences');

// Import API Routes
app.use(sentences);

// Export the server middleware
module.exports = {
    path: '/api',
    handler: app
}