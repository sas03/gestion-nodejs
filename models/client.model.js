const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    name: String,
    address: String,
    contact:String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);
