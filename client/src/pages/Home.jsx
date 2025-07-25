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
  return (
    <div>
      {listOfPosts.map((value, key) => (
        <div className="post" key={key} onClick={() => navigate(`/post/${value.id}`)}>
          <div className="title">{value.title}</div>
          <div className="body">{value.postText}</div>
          <div className="footer">{value.username}</div>
        </div>
      ))}
    </div>
  );
}

export default Home;
