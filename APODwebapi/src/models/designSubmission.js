const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const designSubmissionSchema = new Schema({
    _id: Number,
    userAccountId: { type: String },
    title: { type: String },
    templateId: { type: String },
    productIdArray: [Number],
    designCode: { type: Number },
    status: { type: String },
    tagsList: {type: String},
    html: { type: String },
    designFilepath: { type: String },
    logoFilepath: { type: String },
    dateCreated: { type: Date },
    dateModified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('DesignSubmission', designSubmissionSchema, 'DesignSubmission');