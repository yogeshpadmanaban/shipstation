const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const listUsersSchema = new Schema({
    _id: Number,
    userId: { type: String },
    userName: { type: String },
    name: { type: String },
    dateCreated: { type: Date, default: Date.now() },
    dateModified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('ListUsersSchema', listUsersSchema, 'ListUsersSchema');

// sample data
// [
//     {
//         "userId": "46128c22-b84a-441f-ba02-f4805f2664f5",
//         "userName": "donotreply@laststandmedia.shop",
//         "name": "Paul Perez"
//     }
// ]