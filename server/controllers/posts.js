const { Model, where } = require("sequelize");
const { Posts } = require("../models");
const { likes } = require("./likes");
const { post } = require("../routes/Posts");

const posts = async (req, res) => {
  try {
    const post = req.body;
    post.username = req.user.username;
    await Posts.create(post);
    res.json(post);
  } catch (error) {}
};

//Get All Post
const listOfPosts = async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
  } catch (error) {}
};

const byId = async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);

  res.json(post);
};

const deletePosts = async (req, res) => {
  const  postId  = req.params.postId;

  await Posts.destroy({
    where: {
      id: postId
    }
  })
  res.json("Delete posts Successfully")
};

module.exports = {
  posts,
  listOfPosts,
  byId,
  deletePosts
};
