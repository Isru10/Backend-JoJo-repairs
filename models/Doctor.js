const mongoose = require('mongoose')
const docSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        default:"HO"

    }
})

module.exports = mongoose.model('Doctor',docSchema);