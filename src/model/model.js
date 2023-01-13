let mongoose = require('mongoose')
let jobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
       
    },

description: {
        type: String,
        required: true
    },

   

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
requiredSkills:[{type:String}],
experience:String
  

}, { timestamps: true })
module.exports = mongoose.model("createjob", jobSchema)