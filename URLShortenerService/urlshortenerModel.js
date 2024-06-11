const mongoose = require('mongoose');
const { Schema } = mongoose;

const URLShortenerSchema = new Schema({
  original_url: {
    type: String,
    require: true
  },
  short_url: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("URLShortener", URLShortenerSchema);