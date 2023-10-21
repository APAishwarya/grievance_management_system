const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const FormSchema = new mongoose.Schema({
    complaintText:String,
    date:String,
    department:String,
    file:Buffer,
    location:String
    
})


const UserModel = mongoose.model("users",UserSchema)
const FormModel = mongoose.model("complaints",FormSchema)
module.exports = {
    UserModel,FormModel
}
