import multer from 'multer'

// multer wil save the files in the uploads folder
const storage  = multer.diskStorage({

  destination: 'uploads/',

  filename: (req, file, callback) => {
    let randomPrefix = Date.now().toString(36) + Math.random().toFixed(2).slice(2)
    let fileName = `${randomPrefix}${file.originalname}`
    callback(null, fileName)
  }

})

const multerConfig = multer({ storage })

export default multerConfig
