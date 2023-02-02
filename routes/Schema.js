const mongoose = require("mongoose");
const validator = require("validator")

const emailSchema = new mongoose.Schema({
     email:{
          type: String,
          required: true,
          unique: true,
          lowercase:true,
          validate: (value)=>{
               return validator.isEmail(value)
          }
     }
})

const studentSchema = new mongoose.Schema({
     name:{
          type: String,
          required: true,
          unique: true,
     },
     mobile:{
          type: Number,
          required: true,
          default: "0000000000"
     }
})

const Student = mongoose.model("student", studentSchema);
const Email = mongoose.model("email", emailSchema)

module.exports ={Student,Email} 