const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const materialInventorySchema = new Schema({
    _id: Number,
    name: { type: String },
    unit: { type: String },
    quantity: { type: Number }
});

module.exports = mongoose.model('MaterialInventory', materialInventorySchema, 'MaterialInventory');