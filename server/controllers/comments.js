// const { where } = require("sequelize");
const { Comments } = require("../models");

const comments = async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });

  res.json(comments);
};

const addComments = async (req, res) => {
  const comment = req.body;
  await Comments.create(comment);
  res.json(comment);
};

module.exports = { comments, addComments };
