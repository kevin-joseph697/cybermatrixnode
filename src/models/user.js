const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt =  require('bcryptjs')

const User =  new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
  
})


User.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password,8) 
    }
    next()
})


const Login = mongoose.model('user',User)
module.exports = Login