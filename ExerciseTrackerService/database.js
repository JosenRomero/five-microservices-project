import mongoose from 'mongoose'

mongoose
  .connect(process.env.URI_DB, {})
  .then(db => console.log("DB is connected"))
  .catch(err => console.log("Failed to connect to MongoDB", err));

export default mongoose