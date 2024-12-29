const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initialiseDatabase } = require('./db/db.connect');
const MovieData = require('./models/movieData.model');
const corsOptions = {
  origin: '*',
  credentials: true,
};

const app = express();
const PORT = process.env.PORT || 3000;

initialiseDatabase();
app.use(cors(corsOptions));
app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Hello, Express');
});

app.get('/movies', async (req, res) => {
  try {
    const allMovies = await MovieData.find();
    res.json(allMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/movies', async (req, res) => {
  const { movieTitle, director, genre } = req.body;
  try {
    const movie = new MovieData({ movieTitle, director, genre });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//update by id
app.post('/movies/:id', async (req, res) => {
  const movieId = req.params.id;
  const { movieTitle, director, genre } = req.body;
  try {
    const updatedMovie = await MovieData.findByIdAndUpdate(
      movieId,
      {
        movieTitle,
        director,
        genre,
      },
      { new: true }
    );

    if (!updatedMovie) {
      res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/movies/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const deletedMovie = await MovieData.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      res.status(404).json({ error: 'Movie not found' });
    }

    res
      .status(200)
      .json({ message: 'Movie deleted successfully', movie: deletedMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
