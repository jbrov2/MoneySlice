/* eslint-disable no-constant-condition */
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import styles from "../styles/registerPage.module.css";

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
      <div className={styles.signUp_wrapper}>
        <div className={styles.signUp_container}>
          <div className={styles.create_account}>
            <p
              ref={errRef}
              className={styles.errMsg ? styles.errMsg : styles.offscreen}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form onSubmit={submitHandler} className={styles.signUp}>
              <h2 className={styles.signUp_title}>Register</h2>{" "}
              <label htmlFor="signUp-labels" className={styles.signUp_details}>
                Email
                <span>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? styles.valid : styles.hide}
                  />
                </span>
                <span className={styles.icon_checker}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={styles || !email ? styles.hide : styles.invalid}
                  />
                </span>
              </label>
              <input
                type="text"
                name="signUp-labels"
                placeholder="Username"
                className={styles.signUpdetails_i}
                id={styles.signUp_input}
                size={"45"}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? styles.false : styles.true}
                aria-describedby={styles.uid}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id={styles.uid}
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Enter in your email address
              </p>
              <label htmlFor="signUp-labels" className={styles.signUp_details}>
                Username
                <span>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validUserName ? styles.valid : styles.hide}
                  />
                </span>
                <span className={styles.icon_checker}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validUserName || !userName ? styles.hide : styles.invalid
                    }
                  />
                </span>
              </label>
              <input
                type="text"
                name="signUp-labels"
                placeholder="Username"
                className={styles.signUp_details_i}
                id={styles.signUp_input}
                size={"45"}
                ref={userRef}
                onChange={(e) => setUserName(e.target.value)}
                required
                aria-invalid={validUserName ? styles.false : styles.true}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id={styles.uidnote}
                className={
                  userFocus && userName && !validUserName
                    ? styles.instructions
                    : styles.offscreen
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
                className={styles.signUp_details}
              >
                Password
                <span className={styles.icon_checker}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPassword ? styles.valid : styles.hide}
                  />
                </span>
                <span className={styles.icon_checker}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validPassword || !password ? styles.hide : styles.invalid
                    }
                  />
                </span>
              </label>
              <input
                type="password"
                name="signUp-labels-username"
                placeholder="Password"
                className="signUp-details-i"
                id={styles.signUp_input_username}
                size={"45"}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? styles.false : styles.true}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPassword
                    ? styles.instructions
                    : styles.offscreen
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
                className={styles.signUp_details}
              >
                Confirm Password
                <span className={styles.icon_checker}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={
                      validMatch && matchPassword ? styles.valid : styles.hide
                    }
                  />
                </span>
                <span className={styles.icon_checker}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validMatch || !matchPassword
                        ? styles.hide
                        : styles.invalid
                    }
                  />
                </span>
              </label>
              <input
                type="password"
                name="signUp-labels-password"
                placeholder="Confirm Password"
                className={styles.signUp_details_i}
                id={styles.signUp_input_password}
                size={"45"}
                required
                onChange={(e) => setMatchPassword(e.target.value)}
                aria-invalid={validMatch ? styles.false : styles.true}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id={styles.confirmnote}
                className={
                  matchFocus && !validMatch
                    ? styles.instructions
                    : styles.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the previous password you entered
              </p>
              <button
                disabled={
                  !validUserName || !validPassword || !validMatch ? true : false
                }
                className={styles.signUp_button}
              >
                SIGN UP
              </button>
            </form>{" "}
          </div>{" "}
          <div className={styles.welcome_back}>
            <h2 className={styles.welcome_back_title}>Welcome Back!</h2>
            <button
              className={styles.welcome_back_btn}
              onClick={loginPageHandler}
            >
              SIGN IN
            </button>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default Register;
