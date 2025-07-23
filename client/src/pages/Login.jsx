import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const login =  () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
        navigate('/')
      }
    });
   };
  return (
    <div>
         <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      //   value={username}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      //   value={password}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
