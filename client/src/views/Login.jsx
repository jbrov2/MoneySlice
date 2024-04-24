/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Register from "./Register";

function Login() {
  function signUpPageHandler() {
    history("/signUp");
  }
  const history = useNavigate();

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5000/login", {
          userName,
          password,
        })
        .then((res) => {
          // eslint-disable-next-line no-cond-assign
          if (res.data === "exist") {
            history("/home", { state: { id: userName } });
          } else if ((res.data = "does not exist")) {
            alert("User is not logged in");
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Wrong details");
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h1>Login</h1>
      <form action="http://localhost:5000/login" method="GET">
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder="Username"
          required
        />
        <input
          type="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          required
        />
        <button type="submit" onClick={submit}>
          {" "}
          Sumbit
        </button>
      </form>
      <br />
      <p>OR</p>
      <br />

      <button onClick={signUpPageHandler}>Sign Up Page</button>
    </>
  );
}

export default Login;
