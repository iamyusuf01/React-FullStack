import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState([]);
  const navigate = useNavigate();

  const { authState } = useContext(AuthContext);

  useEffect((e) => {
    
    axios
      .get(`http://localhost:3001/posts/byId/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setPostObject(response.data);
      });

    axios
      .get(`http://localhost:3001/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
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
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setPostObject(response.data);
        navigate("/");
      });
  };

  const editPost = (options) => {
    if (options === "titile") {
      let newTitle = prompt("Enter New Title:");
      axios.put(
        "http://localhost:3001/posts/title",
        { newTitle: newTitle, id: id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );
      setPostObject({ ...postObject, title: newTitle });
    } else {
      let newPostText = prompt("Enter New Text:");
      axios.put(
        "http://localhost:3001/posts/postText",
        { newText: newPostText, id: id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );
      setPostObject({ ...postObject, postText: newPostText });
    }
  };
  return (
    <div className="grid grid-cols-2 px-32 gap-12 pt-12 font-serif">
      <div
        className="flex flex-col justify-center cursor-pointer px-4
           border-gray-400 shadow-blue-100 inset-shadow-2xs inset-shadow-blue-100
           shadow-xl w-[340px] h-[140px] "
      >
        <div
          className="font-medium"
          onClick={() => {
            if (authState.username === postObject.username) {
              editPost("titile");
            }
          }}
        >
          {postObject.title}
        </div>
        <div
          className="text-sm"
          onClick={() => {
            if (authState.username === postObject.username) {
              editPost("postText");
            }
          }}
        >
          {postObject.postText}
        </div>
        <div className="py-2 flex justify-between">
          {postObject.username}{" "}
          <div>
            {authState.username === postObject.username && (
              <button
                className="cursor-pointer rounded w-32 hover:bg-blue-500 hover:text-white"
                onClick={() => deletePost(postObject.id)}
              >
                Delete Posts
              </button>
            )}
          </div>
        </div>
      </div>
      <div className=" grid">
        <div className="border border-gray-500 rounded h-8  w-[340px] pt-1 text-center">
          <input
            className="outline-none"
            type="text"
            placeholder="Comment.."
            onChange={(e) => setNewComments(e.target.value)}
            value={newComments}
          />
          <button
            className="font-medium font-serif cursor-pointer rounded w-32 hover:bg-blue-500 hover:text-white"
            onClick={addComment}
          >
            Add Comments
          </button>
        </div>
        <div className="border border-zinc-400 rounded-xl px-4 mt-6">
          {comments.map((comment, key) => (
            <div
              className="grid grid-cols gap-2 rounded bg-gray-300/50 mx-4 my-6 p-2 "
              key={key}
            >
              <div> {comment.commentBody}</div>
              <div className="flex justify-between">
                <label className="text-sm">Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    className="cursor-pointer rounded w-12 hover:bg-blue-500 hover:text-white
                  "
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
