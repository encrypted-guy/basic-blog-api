const mongoose = require('mongoose')
const URI = process.env.MONGODB_URI

// const mongo = mongoose.connect(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// mongo ? console.log('DB CONNECTED') : console.log(`mongodb error ${mongo}`)


mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('DATABASE CONNECTED')).catch(err => {
    console.log('MONGODB ERROR', err)
    process.exit(1)
})