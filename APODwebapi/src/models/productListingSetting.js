const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const productListingSettingSchema = new Schema({
    _id: Number,
    productId: { type: String },
    userAccountId: { type: String },
    price: { type: Number },
    productTagsList: { type: String },
    productHtml: { type: String }
});

module.exports = mongoose.model('ProductListingSetting', productListingSettingSchema, 'ProductListingSetting');