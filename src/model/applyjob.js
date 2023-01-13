let mongoose = require('mongoose')
let applyjob = new mongoose.Schema({

    name: {
        type: String,
        required: true,
       
    },

resume: {
        type: String,
        required: true
    },

   applyingFor:String,

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
coverLetter:String
  

}, { timestamps: true })
module.exports = mongoose.model("applyjob", applyjob)