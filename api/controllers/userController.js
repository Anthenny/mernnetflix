const User = require("../models/Users");
const CryptoJS = require("crypto-js");

// Update
exports.updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: "kon niet updaten", error: err.message });
    }
  } else {
    res.status(403).json({ message: "You can only update your own account" });
  }
};
// Delete
exports.deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted..");
    } catch (err) {
      return res.status(500).json({ message: "Kon user niet verwijderen", error: err.message });
    }
  } else {
    return res.status(403).json({ message: "You can only delete your own account" });
  }
};

// Get
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Couldn't find user" });
    const { password, ...info } = user._doc;

    res.status(200).json({ message: "succes", info });
  } catch (err) {
    res.status(500).json({ message: "Kon user niet vinden", error: err.message });
  }
};

// Get all
exports.getUsers = async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query ? await User.find().sort({ _id: -1 }).limit(10) : await User.find();
      res.status(200).json({ message: "gevonden", users });
    } catch (err) {
      return res.status(500).json({ message: "Kon users niet vinden", error: err.message });
    }
  } else {
    return res.status(403).json({ message: "You are not allowed to see all users!" });
  }
};
