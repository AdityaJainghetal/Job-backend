// const mongoose = require("mongoose")

// const RegisterEmployee = new mongoose.Schema({

//     name: { type: String, required: true },


//     email: { type: String, required: true, unique: true },

//     phone: {type:String, require:true},

//     DOB: {type:String},

//     City:{type:String},

//     Qualification: {type:String},

//     Skill : [
//         {type:String}
//     ],

//     password: { type: String },

// })
// module.exports = mongoose.model("user", RegisterEmployee)



const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String
    },
    city: {
        type: String
    },
    qualification: {
        type: String
    },
    skills: [{
        type: String
    }],
    password: { 
        type: String 
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    pdfBrochure: String // Changed from PDFbrochure to pdfBrochure for consistency
});

module.exports = mongoose.model("user", employeeSchema);