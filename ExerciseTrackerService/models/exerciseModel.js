import mongoose from 'mongoose'
const { Schema } = mongoose

const ExerciseSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  duration: {
    type: Number,
    require: true
  },
  date: {
    type: String,
    require: true
  }
})

export default mongoose.model("Exercise", ExerciseSchema)