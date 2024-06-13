import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './database.js'
import User from './models/userModel.js'

const app = express()

app.set("port", process.env.PORT || 3000)

app.use(express.urlencoded({ extended: true })); 
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`)
});

app.post('/api/users', async (req, res) => {

  try {

    const newUser = new User({
      username: req.body.username
    })

    const { username, _id } = await newUser.save()

    res.json({
      username,
      _id
    })

  } catch(err) {
    res.status(400).send({ err: "Failed to new user" })
  }

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
