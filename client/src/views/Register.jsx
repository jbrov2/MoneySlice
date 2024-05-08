/* eslint-disable no-constant-condition */
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Register() {
  const REGISTER_URL = "/signUp";

  const history = useNavigate();

  function loginPageHandler() {
    history("/login");
  }
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
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
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  //eror success messages
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //Validation
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);

    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = USER_REGEX.test(userName);

    setValidUsername(result);
  }, [userName]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [email, userName, password, matchPassword]);

  async function submitHandler(e) {
    e.preventDefault();
    //if button is enabled using a java hack
    const v1 = USER_REGEX.test(userName);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const reponse = await axios.post(
        REGISTER_URL,
        JSON.stringify({ userName, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(reponse.data);
      console.log(reponse.accessToken);
      setSuccess(true);
    } catch (error) {
      if (!error.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
    // try {
    //   await axios
    //     .post("http://localhost:5000/signUp", {
    //       email,
    //       userName,
    //       password,
    //       valid,
    //     })
    //     .then((res) => {
    //       // eslint-disable-next-line no-cond-assign
    //       if (res.data === "exist") {
    //         alert("User already exists");
    //       } else if ((res.data = "does not exist")) {
    //         history("/home", { state: { id: userName } });
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       alert("Wrong details");
    //     });
    // } catch (e) {
    //   console.log(e);
    // }
  }
  return (
    <>
      <div className="signUp-wrapper">
        <div className="signUp-container">
          <div className="create-account">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form onSubmit={submitHandler} className="signUp">
              <h2 className="signUp-title">Register</h2>{" "}
              <label htmlFor="signUp-labels" className="signUp-details">
                Email
                <span>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? "valid" : "hide"}
                  />
                </span>
                <span className="icon-checker">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? "hide" : "invalid"}
                  />
                </span>
              </label>
              <input
                type="text"
                name="signUp-labels"
                placeholder="Username"
                className="signUp-details-i"
                id="signUp-input"
                size={"45"}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Enter in your email address
              </p>
              <label htmlFor="signUp-labels" className="signUp-details">
                Username
                <span>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validUserName ? "valid" : "hide"}
                  />
                </span>
                <span className="icon-checker">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validUserName || !userName ? "hide" : "invalid"}
                  />
                </span>
              </label>
              <input
                type="text"
                name="signUp-labels"
                placeholder="Username"
                className="signUp-details-i"
                id="signUp-input"
                size={"45"}
                ref={userRef}
                onChange={(e) => setUserName(e.target.value)}
                required
                aria-invalid={validUserName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && userName && !validUserName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters. <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              <label
                htmlFor="signUp-labels-username"
                className="signUp-details"
              >
                Password
                <span className="icon-checker">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPassword ? "valid" : "hide"}
                  />
                </span>
                <span className="icon-checker">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPassword || !password ? "hide" : "invalid"}
                  />
                </span>
              </label>
              <input
                type="password"
                name="signUp-labels-username"
                placeholder="Password"
                className="signUp-details-i"
                id="signUp-input-username"
                size={"45"}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters. <br />
                Must include uppercase and lowercase letters,
                <br /> a number and a special character. <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hash-tag">#</span>
                <span aria-label="percent">%</span>
                <span aria-label="dollar sign">$</span>
              </p>
              <label
                htmlFor="signUp-labels-password"
                className="signUp-details"
              >
                Confirm Password
                <span className="icon-checker">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPassword ? "valid" : "hide"}
                  />
                </span>
                <span className="icon-checker">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validMatch || !matchPassword ? "hide" : "invalid"
                    }
                  />
                </span>
              </label>
              <input
                type="password"
                name="signUp-labels-password"
                placeholder="Confirm Password"
                className="signUp-details-i"
                id="signUp-input-password"
                size={"45"}
                required
                onChange={(e) => setMatchPassword(e.target.value)}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the previous password you entered
              </p>
              <button
                disabled={
                  !validUserName || !validPassword || !validMatch ? true : false
                }
                className="signUp-button"
              >
                SIGN UP
              </button>
            </form>{" "}
          </div>{" "}
          <div className="welcome-back">
            <h2 className="welcome-back-title">Welcome Back!</h2>
            <button className="welcome-back-btn" onClick={loginPageHandler}>
              SIGN IN
            </button>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default Register;
