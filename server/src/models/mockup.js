const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const mockupSchema = new Schema({
    _id: Number,
    designSubmissionId: { type: String, required: true},
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    filePath: { type: String, default: null },
    imageDescription: { type: String, default: null },
    dateCreated: { type: Date },
    dateModified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Mockup', mockupSchema, 'Mockup');