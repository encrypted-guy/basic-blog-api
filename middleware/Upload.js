const multer  = require('multer')
const path = require('path')
const crypto = require('crypto')

const Today = `${new Date().getFullYear()}_${new Date().getMonth()+1}_${new Date().getDate()}`
const storage = multer.diskStorage({
    destination: `./public/uploads/${Today}`,
    filename: (req, file, next) => {
        crypto.randomBytes(16, (err, genname) => {
            if(!err) {
                const filename = file.fieldname+'-'+genname.toString('hex') + path.extname(file.originalname)
                next(null, filename)
            }else{
                console.log('file upload error | ', err)
                return err
            }
        })
    }
})

const upload = multer({storage})
module.exports = upload
