const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const materialConsumptionSchema = new Schema({
    _id: Number,
    productId: { type: String },
    materialId: { type: String },
    quantityConsumed: { type: Number }
});

module.exports = mongoose.model('MaterialConsumption', materialConsumptionSchema, 'MaterialConsumption');