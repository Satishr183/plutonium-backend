const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fName : String,
    lName : String,
    mobile : {
        type : String,
        unique : true,
        required : true
    },
    gender : {
        type : String,
        enum : ['male','female','LGBTQ']
    },
    age : Number
},{timestamps:true})

module.exports=mongoose.model('User', userSchema)