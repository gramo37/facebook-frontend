const jwt = require("jsonwebtoken");

const sendToken = async (res, user, statusCode) => {
  const token = await jwt.sign({ id: user._id }, process.env.SECRETKEY);

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("authToken", token, options).json({
    success: true,
    token,
  });
};

module.exports = sendToken;
