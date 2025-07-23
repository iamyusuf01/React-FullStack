import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState([]);

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComments,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToadd = {
            commentBody: newComments,
            username: response.data.username,
          };
          setComments([...comments, commentToadd]);
          setNewComments("");
        }
      });
  };

  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/comments/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      setComments(comments.filter((val) => {
        return val.id != id
      }))
    });
  };
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="title">{postObject.title}</div>
        <div className="postText">{postObject.postText}</div>
        <div className="footer">{postObject.username}</div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment.."
            onChange={(e) => setNewComments(e.target.value)}
            value={newComments}
          />
          <button onClick={addComment}>Add Comments</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => (
            <div className="comment" key={key}>
              {comment.commentBody}
              <label>Username: {comment.username}</label>
              {authState.username === comment.username && (
                <button
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
