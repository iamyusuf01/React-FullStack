// const { where } = require("sequelize");
const { Comments } = require("../models");

const comments = async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });

  res.json(comments);
};

const addComments = async (req, res) => {
  const comment = req.body;

  const username = req.user.username;

  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
};

const deleteComments = async (req, res) => {
  const commentId = req.params.commentId;
  Comments.destroy({
    where: {
      id: commentId,
    },
  });
  res.json("Deleted Successfully")
};
module.exports = { comments, addComments, deleteComments };
