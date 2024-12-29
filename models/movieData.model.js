const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    movieTitle: String,
    director: String,
    genre: String,
  },
  { timestamps: true }
);

const MovieData = mongoose.model('MovieData', movieSchema);
module.exports = MovieData;
