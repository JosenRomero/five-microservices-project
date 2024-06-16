import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()

app.set("port", process.env.PORT || 3000)

app.use(cors())
app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`)
});

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});