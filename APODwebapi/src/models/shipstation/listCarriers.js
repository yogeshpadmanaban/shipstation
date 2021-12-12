const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const listCarriersSchema = new Schema({
    _id: Number,
    name: { type: String },
    code: { type: String },
    accountNumber: { type: String },
    requiresFundedAccount: { type: Boolean },
    balance: { type: Number },
    nickname: { type: String },
    shippingProviderId: {type: Number},
    primary: { type: Boolean },
    
    dateCreated: { type: Date, default: Date.now() },
    dateModified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('ListCarriersSchema', listCarriersSchema, 'ListCarriersSchema');



// sample data

// "name": "Stamps.com",
// "code": "stamps_com",
// "accountNumber": "rsuper-970644",
// "requiresFundedAccount": true,
// "balance": 110.1600,
// "nickname": "APOD",
// "shippingProviderId": 158462,
// "primary": true