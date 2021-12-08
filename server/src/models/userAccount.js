const mongoose = require('mongoose'),
Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const userAccountSchema = new Schema({
    _id: Number,
    userName: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    designIdPrefix: { type: String, default: null },
    designIdOffset: { type: Number, default: null },
    roles: [String],
    dateCreated: { type: Date },
    dateModified: { type: Date, default: Date.now() }
});

userAccountSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserAccount', userAccountSchema, 'UserAccount');