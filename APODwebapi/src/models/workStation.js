const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const workStationSchema = new Schema({
    _id: Number,
    name: { type: String, required: true },
    html: { type: String, required: true }
});

module.exports = mongoose.model('WorkStation', workStationSchema, 'WorkStation');