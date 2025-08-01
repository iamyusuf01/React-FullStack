import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/user-info/${id}`).then((response) => {
      setUsername(response.data?.username);
    });

    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div>
      <div className="user-ingo">
        <h1>Username: {username}</h1>
        { authState.username === username && (
          <button onClick={() => {navigate('/change-password')}}> Change Password</button>
          )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => (
          <div className="post" key={key}>
            <div className="title">{value.title}</div>
            <div className="body" onClick={() => navigate(`/post/${value.id}`)}>
              {value.postText}
            </div>
            <div className="footer">
              <Link to={`/profile/${value.UserId}`}>{value.username} </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
