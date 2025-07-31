import React, { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      navigate("/");
      axios.get("http://localhost:3001/posts").then((response) => {
        setListOfPosts(response.data);
      });
    }
  }, []);

  const likePost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, likes: [...post.likes, 0] };
              } else {
                const likesArray = post.likes;
                likesArray.pop();
                return { ...post, likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };
  return (
    <div>
      {listOfPosts.map((value, key) => (
        <div className="post" key={key}>
          <div className="title">{value.title}</div>
          <div className="body" onClick={() => navigate(`/post/${value.id}`)}>
            {value.postText}
          </div>
          <div className="footer">
            {value.username}{" "}
            <ThumbUpAltIcon onClick={() => likePost(value.id)} />
            {/* <label>{value.likes.length}</label> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
