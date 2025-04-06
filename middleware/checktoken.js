const jwt = require("jsonwebtoken");
const jwt_secret = "hellboy";

let checktoken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    // console.log(token);
    let decoded = jwt.verify(token, jwt_secret);
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ msg: "provide valid token", success: false });
  }
};

module.exports = checktoken;
