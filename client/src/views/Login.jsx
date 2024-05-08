/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

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
  }
  return (
    <>
      <h1>Login</h1>
      <form action="http://localhost:5000/login" method="POST">
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
