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
    <div className="grid grid-cols-3 px-12 gap-12 pt-12 justify-items-center">
      {listOfPosts.map((value, key) => (
        <div
          className=" flex flex-col justify-center  border-gray-400 shadow-blue-200 inset-shadow-2xs inset-shadow-blue-100 shadow-xl w-[340px] h-[140px]"
          key={key}
        >
          <div className="pl-4">
            <div className="font-serif">{value.title}</div>
            <div
              className="font-serif"
              onClick={() => navigate(`/post/${value.id}`)}
            >
              {value.postText}
            </div>
          </div>
          <div className="font-serif flex justify-between px-4 pt-4">
            {value.username}{" "}
            <ThumbUpAltIcon className="cursor-pointer" onClick={() => likePost(value.id)} />
            {/* <label>{value.likes.length}</label> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
