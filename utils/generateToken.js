const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn });
};

module.exports = generateToken;
