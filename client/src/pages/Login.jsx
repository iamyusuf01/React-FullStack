import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
function Login() {
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')

 const navigate = useNavigate()

 const login = async () => {
    const data = {username: username, password: password};
     axios.post("http://localhost:3001/posts", data).then((response) => {
    });
 }
  return (
    <div>
       <input type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
       />
       <input type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
       />
       <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
