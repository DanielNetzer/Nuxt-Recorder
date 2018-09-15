const express = require('express');
const mongoose = require('mongoose');

//Set up mongoose connection
mongoose.connect('<MONGODBCONNURL>', { user: '<MONGODBCONNUSER>', pass: '<MONGODBCONNPASS>' }, (err) => {
    if (err) {
        throw new Error(`MongoDB Error, ${err}`);
    }

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