import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        toast("Username and Password Worng! please try again")
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        toast("User login sucessfully")
        navigate("/");
      }
    });
  };
  return (
    <div className=" flex justify-center mt-12">
      <div className="shadow-2xl shadow-blue-300 w-[400px] h-[300px] flex flex-col justify-center items-center pt-6">
        <div className=" flex items-center py-2 gap-4">
          <label className="text-xl font-medium font-serif">Username :</label>
          <input
            className="border border-gray-600 rounded outline-none px-2 text-gray-600"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            //   value={username}
          />
        </div>
        <div className=" flex items-center py-2 gap-4">
          <label className="text-xl font-medium font-serif pl-1">
            Password :
          </label>
          <input
            className="border border-gray-600 rounded outline-none px-2 text-gray-600"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            //   value={password}
          />
        </div>
        <button
          className="font-medium font-serif border rounded w-32 mt-8 h-8 hover:bg-blue-500 hover:text-white"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
