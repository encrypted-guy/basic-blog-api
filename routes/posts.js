const router = require('express').Router()
const Post = require('../model/Post')


// GET ALL POSTS
router.get('/posts', async (req, res) => {
    // res.json({"hello": "hello"})
    try {
        const posts = await Post.find()
        res.status(200).json({
            success: true,
            data: posts
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            msg: "failed at '/posts/ | ", err
        })
    }
})


// ADD NEW POST
router.post('/add', async (req, res) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).json({
            success: true,
            data: post
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            msg: 'faild while creating new post | ', err
        })
    }
})


// UPDATE A POST
router.put('/update/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!post) return res.status(400).json({success: false})

        res.status(200).json({
            success: true,
            data: post
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            msg: 'failed updating post |', err 
        })
    }
})




module.exports = router