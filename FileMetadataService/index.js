import fs from 'node:fs' // file system
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import multer from './config/multerConfig.js'

const app = express()

app.set("port", process.env.PORT || 3000)

app.use(cors())
app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`)
});

app.post('/api/fileanalyse', multer.single('upfile'), async (req, res) => {

  try {

    const { originalname, mimetype, size, path: filePath } = req.file

    // delete the file of the uploads folder 
    await fs.promises.unlink(filePath)

    res.json({
      name: originalname,
      type: mimetype,
      size: size
    })

  } catch(err) {
    res.status(500).send("Something went wrong.")
  }

});

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});