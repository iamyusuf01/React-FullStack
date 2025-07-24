const { where } = require("sequelize");
const { Likes } = require("../models");
const { useId } = require("react");
const Comments = require("../models/Comments");

const likes = async (req, res) => {
  const { PostId } = req.body;

  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });

  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json("Liked the post");
  } else {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
  }

  res.json("Unlike the post");
};

module.exports = {
  likes,
};
