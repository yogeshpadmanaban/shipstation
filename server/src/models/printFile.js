const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const printFileSchema = new Schema({
    _id: Number,
    designSubmissionId: { type: String, required: true},
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    size: { type: String, default: null },
    filePath: { type: String, default: null },
    dateCreated: { type: Date },
    dateModified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('PrintFile', printFileSchema, 'PrintFile');