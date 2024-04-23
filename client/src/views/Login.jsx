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

  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [valid, setValid] = useState();

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5173/login", {
          email,
          userName,
          password,
          valid,
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
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <h1>Login</h1>
      <form action="POST">
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          required
        />
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
        <input
          type="Password"
          onChange={(e) => {
            setValid(e.target.value);
          }}
          placeholder="Re-Enter Password"
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
