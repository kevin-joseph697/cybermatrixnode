const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt =  require('bcryptjs')

const userSchema =  new mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    mobile:{
        type:Number
    },
    companyname:{
        type:String
    }
})

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password,8) 
    }
    next()
})


const user = mongoose.model('userlist',userSchema)
module.exports = user