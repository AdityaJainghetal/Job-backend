const mongoose = require("mongoose");

const RegisterEmployee = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    businessType: { type: String, required: true },
    industry: { type: String, required: true },
    website: { type: String },
    location: { type: String, required: true },
    contactPerson: { type: Number, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: Number, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    hiringNeeds: { type: Number, required: true },
    ProfilePhoto: { type: String },
    Coverphoto: { type: String },
    resetPasswordOTP: { type: String },
    resetPasswordOTPExpires: { type: Date }
});

module.exports = mongoose.model("Employee", RegisterEmployee);