/* eslint-disable no-constant-condition */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const history = useNavigate();

  function loginPageHandler() {
    history("/login");
  }

  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [valid, setValid] = useState();

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5000/signUp", {
          email,
          userName,
          password,
          valid,
        })
        .then((res) => {
          // eslint-disable-next-line no-cond-assign
          if (res.data === "exist") {
            alert("User already exists");
          } else if ((res.data = "does not exist")) {
            history("/home", { state: { id: userName } });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Wrong details");
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <h1>Register</h1>
      <form action="http://localhost:5000/signUp" method="POST">
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

      <button onClick={loginPageHandler}> Login Page</button>
    </>
  );
}

export default Register;
