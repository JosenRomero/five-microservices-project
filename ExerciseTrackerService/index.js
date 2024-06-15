import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './database.js'
import User from './models/userModel.js'
import Exercise from './models/exerciseModel.js'
import { formatDate, checkFiltersForLogs } from './utils.js'

const app = express()

app.set("port", process.env.PORT || 3000)

app.use(express.urlencoded({ extended: true })); 
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`)
});

app.get('/api/users', async (req, res) => {

  try {

    const users = await User.find({}, 'username _id')

    res.json({ users })

  } catch(err) {
    res.status(400).send({ err: "Failed to get users" })
  }

});

// /api/users/:_id/logs?from&to&limit
app.get('/api/users/:_id/logs', async (req, res) => {

  try {

    const { from, to, limit } = req.query

    const { username, _id } = await User.findById(req.params._id)

    let filters = checkFiltersForLogs({ from, to, _id})

    const logs = await Exercise.find(filters, 'description duration date -_id')

    const limitValue = Number(limit)
    let logsSelected = (limitValue && limitValue < logs.length) ? [...logs].slice(0, limitValue) : [...logs]

    res.json({
      username,
      _id,
      count: logsSelected.length,
      log: logsSelected
    })

  } catch(err) {
    res.status(500).send({ err: "Something went wrong." })

  }

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

app.post('/api/users/:_id/exercises', async (req, res) => {

  try {

    const _id = req.params._id

    const { description, duration, date } = req.body

    const { username } = await User.findById(_id)

    const durationValue = Number(duration)

    const { formattedDate, timestamps } = formatDate(date)

    if(!username || typeof description !== 'string' || !durationValue || formattedDate === "Invalid Date" || !timestamps) throw new Error()

    const newExercise = new Exercise({
      userID: _id,
      description,
      duration: durationValue,
      date: formattedDate,
      timestamps
    })

    await newExercise.save()

    res.json({
      username,
      description,
      duration: durationValue,
      date: formattedDate,
      _id
    })

  } catch(err) {
    res.status(400).send({ err: "Failed to new exercise" })
  }

});

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});
