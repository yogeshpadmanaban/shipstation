const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const listPackagesSchema = new Schema({
    _id: Number,
    carrierCode: { type: String },
    code: { type: String },
    name: { type: String },
    domestic: { type: Boolean },
    international: { type: Boolean },
    
    dateCreated: { type: Date, default: Date.now() },
    dateModified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('ListPackagesSchema', listPackagesSchema, 'ListPackagesSchema');



// sample data

// "carrierCode": "stamps_com",
// "code": "package",
// "name": "Package",
// "domestic": true,
// "international": true