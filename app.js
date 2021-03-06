const env = process.env.NODE_ENV

if(env === "development" || env  === "test"){
  require("dotenv").config()
}

const express = require('express')
const app = express()
const routes = require('./routes/index')
const errorHandler =require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

// const port = process.env.PORT || 3000

// app.listen(port,()=>{
//     console.log(`listening on port ${port}`)
// })
module.exports = app
