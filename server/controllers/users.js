const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
const { Comments } = require("../models/Comments");
const { where } = require("sequelize");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.json({
        success: false,
        message: "Username or Password required",
      });
    }

    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      res.json("Success");
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });
    if (!user) res.json({ error: "User not found" });

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "wrong username or password combination" });
      }

      const accessToken = jwt.sign(
        { username: user.username, id: user.id },
        "mysqlusingnodejs"
      );

      res.json({ token: accessToken, username: username, id: user.id });
    });
  } catch (error) {
    console.error(error);
  }
};

const verifyUser = async (req, res) => {
  res.json(req.user);
};

const userProfile = async (req, res) => {
  const id = req.params.id;

  const userInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(userInfo);
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await Users.findOne({ where: { username: req.user.username } });
  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) {
      res.json({ error: "Wrong Password Entered!" });
    }

    bcrypt.hash(newPassword, 10).then(async (hash) => {
      await Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("Password Chnage");
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  userProfile,
  changePassword,
};
