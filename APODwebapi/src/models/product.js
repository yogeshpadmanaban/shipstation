const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: Number,
    productFamily: { type: String },
    productName: { type: String },
    sizeList: { type: String },
    mockupList: { type: String },
    productCode: { type: String },
    variantCode: { type: String },
    variantName: {type: String},
    variantValue: { type: String },
    displayName: { type: String },
    templateId: { type: String },
    defaultPrice: { type: Number },
    weight: { type: Number },
    cost: { type: Number }
});

module.exports = mongoose.model('Product', productSchema, 'Product');