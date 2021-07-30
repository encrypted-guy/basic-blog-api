const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')

const app = express()


// MIDDLEWIRES
dotenv.config({ path: './config/config.env' })
app.use(morgan('dev'))

require('./config/db')
app.use(express.json())




// ROUTES
app.use('/api/v1', require('./routes/posts'))





const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`SERVER RUNNING ON PORT ${PORT}`))