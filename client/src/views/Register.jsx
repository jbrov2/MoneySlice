import { useState } from "react";

import axios from "axios";

function Register() {
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [valid, setValid] = useState();

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5173/Register", {
        email,
        userName,
        password,
        valid,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <h1>Register</h1>
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

      <button>
        {" "}
        <a href="/Login"></a>Login Page
      </button>
    </>
  );
}

export default Register;
