const mongoose = require('mongoose'); 

exports.dbConnection = () => {
    const url = 'mongodb://127.0.0.1/apodDev';
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}