const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcryptjs')



router.post('/register',async(req,res)=>{
    try{
        const User = new user({
            ...req.body
        })
        await User.save()
        res.status(200).send({
            msg:'user created successfully'
        })
    }catch(err){
        console.log(err)
        res.status(500).send(err)
        
    }
})

router.post('/login',async(req,res)=>{
    try{
        const username = req.body.username
        const password = req.body.password

        const User = await user.findOne({username})
        if(!User){
            return res.status(200).send({
                flag:0,
                msg:'Not able to find the user'
            })
        }
        const isValid = await bcrypt.compare(password,User.password)
        if(!isValid){
            return res.status(200).send({
                flag:0,
                msg:'password is incorrect'
            })
        }
        return res.status(200).send({
            flag:1,
            msg:'Login Successfull'
        })

    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})


module.exports = router