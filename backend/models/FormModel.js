const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: String,
    fatherName: String,
    email: String,
    gender: String,
    phone: String,
    address: String,
    dob: String,
    bloodGroup: String,
    lastDonation: String,
    disease: String,
    allergies: String,
    cardiac: String,
    bleeding: String
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
