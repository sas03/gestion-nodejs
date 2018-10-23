const mongoose = require('mongoose');

const SalarieSchema = mongoose.Schema({
    name: String,
    firstname: String,
    username: String,
    address: {
        rue: String,
        ville: String,
        codepostal: Number 
    },
    telephone: Number,
    email: String,
    position: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Salarie', SalarieSchema);
