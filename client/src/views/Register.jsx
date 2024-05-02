/* eslint-disable no-constant-condition */
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faC,
} from "@fortawesome/free-solid-svg-icons";

function Register() {
  const history = useNavigate();

  function loginPageHandler() {
    history("/login");
  }
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  //username
  const [userName, setUserName] = useState("");
  const [validUserName, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  //password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  //validation
  const [matchPassword, setMatchPassword] = useState("");
  const [matchValid, setMatchValid] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  //eror success messages
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //Validation
  useEffect(() => {
    const result = USER_REGEX.test(userName);

    setValidUsername(result);
  }, [userName]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

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
