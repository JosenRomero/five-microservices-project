import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './database.js'

const app = express()

app.set("port", process.env.PORT || 3000)

app.use(express.urlencoded({ extended: true })); 
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`)
});

app.post('/api/users', (req, res) => {

  res.json({
    username: req.body.username,
    _id: "123456"
  })

});

app.post('/api/users/:_id/exercises', (req, res) => {

  const _id = req.params._id

  const { description, duration, date } = req.body

  res.json({
    username: "test",
    description,
    duration,
    date,
    _id
  })

});

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});
