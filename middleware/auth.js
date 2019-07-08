const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "password");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json("Invalid token.");
  }
};
