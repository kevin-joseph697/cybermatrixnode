const express = require('express')
const cors = require('cors')
const userList = require('./routes/userdetails')
const User = require('./routes/user')
require('./db/mongoose')
const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use(userList)
app.use(User)

app.listen(PORT,()=>{
    console.log('server is runing at port 3001')
})