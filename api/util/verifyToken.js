const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) return res.status(401).json({ message: "you are not authenticated" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "token is not valid" });
    req.user = user;
    next();
  });
};

module.exports = verify;
