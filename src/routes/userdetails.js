const express = require('express')
const router = express.Router()
const userList = require('../models/userdetails')



router.post('/userList',async(req,res)=>{
    try{
        const userDetails = new userList({
            ...req.body
        })
        await userDetails.save()
        return res.status(200).send({
            msg:'User Details added'
        })
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})


router.get('/userList',async(req,res)=>{
    try{
        const userDetails = await userList.find({})
        if(userDetails.length > 0 ){
            return res.status(200).send(userDetails)
        }else{
            return res.status(404).json({
                msg:'No Records Found'
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})

// update and delete remaning

router.post('/updateRecords',async(req,res)=>{
    try{
        console.log(req.body)
        const user = await userList.findByIdAndUpdate(req.body.id,{$set:{companyname:req.body.companyname}},{new:true})
        
        if(!user){
            return res.status(404).send('notfound')
        }
        res.send('found and updated')
    }catch(err){
        console.log(err)
        return res.status(500).send(error)
    }
})



router.delete('/deleteRecords/:id',async(req,res)=>{
    try{
        const user = await userList.findOneAndDelete({_id:req.params.id})
        if (!user) {
            return res.status(404).send('user not found')
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router