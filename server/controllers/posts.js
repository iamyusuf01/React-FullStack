const { Model, where } = require("sequelize");
const { Posts } = require("../models");
const { likes } = require("./likes");
const { post } = require("../routes/Posts");

const posts = async (req, res) => {
  try {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
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

const byUserId = async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({ where: { UserId: id } });

  res.json(listOfPosts);
};

const editTitle = async (req, res) => {
  const {newTitle, id} = req.body
  await Posts.update({title: newTitle}, {where: {id: id}})
 res.json(newTitle);
}
const editPostText = async (req, res) => {
  const {newText, id} = req.body
  await Posts.update({postText: newText}, {where: {id: id}})
 res.json(newText);
}

const deletePosts = async (req, res) => {
  const postId = req.params.postId;

  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("Delete posts Successfully");
};

module.exports = {
  posts,
  listOfPosts,
  byId,
  deletePosts,
  byUserId,
  editTitle,
  editPostText
  
};
