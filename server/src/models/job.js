const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const jobSchema = new Schema({
    _id: Number,
    shipStationOrderId: { type: String, required: true },
    designSubmissionId: { type: String, required: true },
    productId: { type: String, required: true },
    printFileId: { type: String, default: null },
    status: { type: Number, default: null },
    workStationId: { type: String, default: null },
    quantity: { type: Number, default: null },
    dateCreated: { type: Date },
    dateModified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Job', jobSchema, 'Job');