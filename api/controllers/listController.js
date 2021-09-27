const List = require("../models/List");

exports.createList = async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);

    try {
      const savedList = await newList.save();
      res.status(201).json({ message: "succes", savedList });
    } catch (err) {
      return res.status(500).json({ message: "Er ging iets fout", error: err.message });
    }
  } else {
    res.status(403).json({ message: "You are not an admin" });
  }
};

exports.deleteList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json({ message: "succesfully deleted" });
    } catch (err) {
      return res.status(500).json({ message: "Er ging iets fout", error: err.message });
    }
  } else {
    res.status(403).json({ message: "You are not an admin" });
  }
};

exports.getLists = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }, { $match: { type: typeQuery } }]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json({ message: "succes", list: list });
  } catch (err) {
    return res.status(401).json({ message: failed, error: err.message });
  }
};
