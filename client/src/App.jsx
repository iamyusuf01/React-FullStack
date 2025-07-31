import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const { authState, logout } = useContext(AuthContext);
  return (
    <div>
      <div className="navbar">
        <Link to={"/"}>Home Page</Link>
        <Link to={"/createpost"}>Create a post</Link>
        {!authState.status ? (
          <>
            <Link to={"/login"}> Login</Link>
            <Link to={"/register"}> Register</Link>
          </>
        ) : (
          <button onClick={logout}>LogOut</button>
        )}
        <h2>{authState.username}</h2>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
