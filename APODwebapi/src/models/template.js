const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const templateSchema = new Schema({
    _id: Number,
    templateName: { type: String },
    width: { type: Number },
    height: { type: Number },
});

module.exports = mongoose.model('Template', templateSchema, 'Template');