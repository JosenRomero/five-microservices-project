import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    require: true
  }
})

export default mongoose.model("User", UserSchema)