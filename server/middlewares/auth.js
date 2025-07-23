const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    res.json({ error: "User not logged in!" });
  }

  try {
    const validToken = jwt.verify(accessToken, "mysqlusingnodejs");

    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({
      error: error,
    });
  }
  next();
};

module.exports = { validateToken };
