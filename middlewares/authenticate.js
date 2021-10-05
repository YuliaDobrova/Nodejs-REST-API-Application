const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    // console.log(id);
    const user = await User.findById(id);
    if (!user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    // console.log(user);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
  }
};

module.exports = authenticate;
