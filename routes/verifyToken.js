const jwt = require("jsonwebtoken");
require("dotenv/config");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.token;
    const { iat } = jwt.verify(token, process.env.SECRET);
    next();
  } catch (err) {
    res.send(err.message);
  }
};
module.exports = verifyToken;
