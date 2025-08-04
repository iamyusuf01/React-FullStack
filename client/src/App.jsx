import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const { authState, logout } = useContext(AuthContext);
  return (
    <div>
      <ToastContainer />
      <div className=" flex justify-between items-center bg-blue-300 px-32 h-16 text-xl font-medium font-serif">
        {!authState.status ? (
          <div className="flex justify-center items-center gap-10">
            <Link to={"/login"}> Login</Link>
            <Link to={"/register"}> Register</Link>
          </div>
        ) : (
          <div className="flex justify-between gap-10">
            <Link to={"/"}>Home</Link>
            <Link to={"/createpost"}>Create a post</Link>
          </div>
        )}
        <div className="flex gap-10">
          <h2 className="cursor-pointer" >{authState.username}</h2>
          {authState.status && (
            <button className="cursor-pointer" onClick={logout}>
              LogOut
            </button>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
