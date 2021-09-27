const User = require("../models/Users");
const CryptoJS = require("crypto-js");

exports.register = async (req, res) => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.SECRET_KEY
  ).toString();
  const newUser = await new User({
    email: req.body.email,
    password: encryptedPassword,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Could not complete your registration", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Wrong password or email");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password)
      return res.status(401).json("Wrong password or email");

    // const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
    //   expiresIn: "5d",
    // });

    const { password, ...info } = user._doc;

    res.status(200).json(info);
  } catch (err) {
    res.status(500).json({ message: "Could not complete your login", error: err.message });
  }
};
