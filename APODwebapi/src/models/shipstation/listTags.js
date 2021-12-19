const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const listTagsSchema = new Schema({
    _id: Number,
    tagId: { type: Number },
    name: { type: String },
    color: { type: String },
    dateCreated: { type: Date, default: Date.now() },
    dateModified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('ListTagsSchema', listTagsSchema, 'ListTagsSchema');

// sample data
// [
//     {
//       "tagId": 8362,
//       "name": "Backorder",
//       "color": "#800080"
//     },
// ]