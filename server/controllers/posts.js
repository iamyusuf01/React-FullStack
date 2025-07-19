const { Posts } = require("../models");

const posts = async (req, res) => {
  try {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
  } catch (error) {}
};

//Get All Post
const listOfPosts = async (req, res) => {
    try {
        const listOfPosts = await Posts.findAll();
        res.json(listOfPosts)
    } catch (error) {
        
    }
}

const byId = async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id)

  res.json(post)
}

module.exports = {
  posts,
  listOfPosts,
  byId
};
