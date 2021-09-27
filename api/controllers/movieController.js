const Movie = require("../models/Movie");

exports.createMovie = async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);

    try {
      const savedMovie = await newMovie.save();
      res.status(201).json({ message: "succes", savedMovie });
    } catch (err) {
      return res.status(500).json({ message: "Er ging iets fout", error: err.message });
    }
  } else {
    res.status(403).json({ message: "You are not an admin" });
  }
};

exports.updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({ message: "succes", updatedMovie });
    } catch (err) {
      return res.status(500).json({ message: "Er ging iets fout", error: err.message });
    }
  } else {
    res.status(403).json({ message: "You are not an admin" });
  }
};

exports.deleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Succesfully deleted" });
    } catch (err) {
      return res.status(500).json({ message: "Er ging iets fout", error: err.message });
    }
  } else {
    res.status(403).json({ message: "You are not an admin" });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({ message: "Succes", movie });
  } catch (err) {
    return res.status(500).json({ message: "Er ging iets fout", error: err.message });
  }
};

exports.getRandomMovie = async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([{ $match: { isSerie: true } }, { $sample: { size: 1 } }]);
    } else {
      movie = await Movie.aggregate([{ $match: { isSerie: false } }, { $sample: { size: 1 } }]);
    }
    res.status(200).json(movie);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Er ging iets fout", error: err.message, err });
  }
};

exports.getAllMovies = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json({ message: "Succesfully found movies", movie: movies.reverse() });
    } catch (err) {
      return res.status(500).json({ message: "Er ging iets fout", error: err.message });
    }
  } else {
    res.status(403).json({ message: "You are not an admin" });
  }
};
