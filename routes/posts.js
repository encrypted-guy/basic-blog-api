const router = require('express').Router()
const Post = require('../model/Post')

const upload = require('../middleware/Upload')
const auth = require('../middleware/Auth')

// GET ALL POSTS
router.get('/posts', async (req, res) => {
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

// POST BY USERS
router.get('/user/:id', async (req, res) => {
    try {
        const posts = await Post.find({created_by: req.params.id})
        if(!posts) return res.status(400).json({success: false, mag: "no posts on given ID"})

        res.status(200).json({
            success: true,
            posts
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            msg: 'cant get post by users | ', err
        })
    }
})

// ADD NEW POST
router.post('/add', auth,  async (req, res) => {
    try {
        req.body.created_by = req.user.id
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

// ADD AND UPDATE PHOTOS
router.put('/photo/:id', [upload.single('file'), auth], async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                success: false,
                msg: 'no file selected'
            })
        }else {
            const Image = {photo: req.file.path}
            // const post = await Post.findByIdAndUpdate(req.params.id, Image, {
            //     new: true,
            //     runValidators: true
            // })
            const post = await Post.findById(req.params.id)

            
            if(!post) return res.status(400).json({success: false})
            if(post.created_by.toString() !== req.user.id.toString()) return res.status(400).json({success: false, msg: 'permission denied'})
            
            await post.updateOne(Image, {new: true, runValidators: true})

            res.status(200).json({
                success: true,
                data: post
            })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            msg: 'cant update / upload photo ', err
        })
    }
})

// UPDATE A POST
router.put('/update/:id', auth, async (req, res) => {
    try {
        // const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })
        const post = await Post.findById(req.params.id)
        
        if(!post) return res.status(400).json({success: false})
        if(post.created_by.toString() !== req.user.id.toString()) return res.status(400).json({success: false, msg: 'permission denied'})

        await post.updateOne(req.body, {new: true, runValidators: true})

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


// DELETE A POST
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        // const post  = await Post.findByIdAndDelete(req.params.id)
        const post  = await Post.findById(req.params.id)
        if(!post) return res.status(400).json({success: false})
        if(post.created_by.toString() !== req.user.id.toString()) return res.status(400).json({success: false, msg: 'permission denied'})

        await post.delete()

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            msg: 'failed delete request | ', err
        })
    }
})






module.exports = router