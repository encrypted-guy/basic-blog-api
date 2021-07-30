const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    photo: {
        type: String,
        default: '/public/uploads/default.jpg'
    },
    created_AT: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('post', PostSchema)
