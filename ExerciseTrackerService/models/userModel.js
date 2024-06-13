import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
  uid: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  }
})

export default mongoose.model("User", UserSchema)