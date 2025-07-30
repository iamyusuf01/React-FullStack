import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
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
                const likesArray = post.likes
                likesArray.pop()
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
            <button onClick={() => likePost(value.id)}>Like </button>
            {/* <label>{value.likes.length}</label> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
