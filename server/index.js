const express = require("express");
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const postsRouter = require('./routes/Posts')
const commentsRouter = require('./routes/Comments')
const authRouter = require('./routes/Users')
const likeRouter = require('./routes/Likes')
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/auth", authRouter);
app.use("/likes", likeRouter);



db.sequelize.sync().then(() => {
  app.listen(3001, () => console.log("Server running on port 3001"));
});
