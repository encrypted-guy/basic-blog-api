const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../model/User')
const auth = require('../middleware/Auth')

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body
        
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: 'please enter requried feilds'
            })
        }

        let user = await User.findOne({email})
        if(user) return res.status(400).json({success: false, msg: 'user already exixts'})

        user = new User({name, email, password})
        
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()

        res.status(200).json({
            success: true,
            msg: 'login: /api/v1/login'
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            msg: 'register failed', err
        })
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        if( !email || !password){
            return res.status(400).json({ 
                success: false, 
                msg: 'invalid credentials' 
            })
        }

        let user = await User.findOne({email}).select('+password')
        if(!user) return res.status(400).json({success: false, msg: 'invalid credentials' })

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({success: false, msg: 'invalid credentials' })

        const payload = {
            id: user._id
        }

        jwt.sign(payload, process.env.JWTSECRECT, {
            expiresIn: 36000
        }, (err, token) => {
            if(err) throw err
            res.status(200).json({
                success: true,
                token
            })
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            msg: 'LOGIN failed', err
        })
    }
})


router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            msg: 'auth failed', err
        })
    }
})


module.exports = router