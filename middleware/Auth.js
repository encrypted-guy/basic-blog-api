const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token  = req.header('x-auth-token')
    if(!token) {
        return res.status(401).json({
            success: false,
            msg: 'no Token, Access Denied'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRECT)
        req.user = decoded
        next()
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            msg: 'Token is not valid'
        })
    }

}
module.exports = auth