import { Button, TextField } from "@mui/material";

import axios from "axios";
import { useState } from "react";

import { createTheme } from "@mui/material/styles";
import {useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

 
  const logInHandler = (e) => {
    e.preventDefault();
    async function login() {
      try {
        const { data } = await axios.post(
          "http://rezayari.ir:5050/Auth/login",
          {
            username: userName,
            password: pass,
          }
        );
        localStorage.setItem("TOKEN", data.token);
        console.log("ok");
        navigate("/data");
      } catch (e) {
        alert("not allowed");
        console.log(e);
      }
    }

    login();
  };

  return (
    <div className="log-in">
      <form onSubmit={logInHandler} className="form=container">
        <div className="user-name">
          <TextField
            id="outlined-basic1"
            label="نام کاربری"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="pass">
          <TextField
            id="outlined-basic"
            label="رمز عبور"
            variant="outlined"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="subBtn">
          <Button variant="contained" type="submit">
            ورود
          </Button>
        </div>
      </form>
    </div>
  );
}
export default Login;
