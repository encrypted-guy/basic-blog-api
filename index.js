const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')

const dotenv = require('dotenv')

const app = express()


// MIDDLEWIRES
dotenv.config({ path: './config/config.env' })
app.use(morgan('dev'))
// --secure
app.use(helmet())
app.use(xss())
app.use(hpp())
const limiter = rateLimit({ 
    windowMs: 10 *60 *1000,
    max: 100
})
app.use(limiter)

require('./config/db')
app.use(express.json())
app.use('/public',express.static('public'))


// ROUTES
app.use('/api/v1', require('./routes/posts'))
app.use('/api/v1', require('./routes/user'))



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`SERVER RUNNING ON PORT ${PORT}`))