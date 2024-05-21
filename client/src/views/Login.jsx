/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/loginPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const history = useNavigate();
  const userRef = useRef(null); // Initialize the ref with null
  const [userName, setUserName] = useState("");
  const [userFocus, setUserFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  function signUpPageHandler() {
    history("/signUp");
  }

  async function submit(e) {
    e.preventDefault();
    // Handle form submission logic here
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <section className={styles.loginHolder}>
          <h1>Login</h1>
          <form action="http://localhost:5000/login" method="POST">
            <label htmlFor="login_Username" className={styles.signUp_details}>
              Username
              <span>
                <FontAwesomeIcon
                  icon={faCheck}
                  className={userName ? styles.valid : styles.hide}
                />
              </span>
            </label>
            <input
              type="text"
              id="login_Username"
              ref={userRef} // Attach the ref here
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              name="login_userName"
              required
              className={styles.input_style}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id={styles.uidnote}
              className={
                userFocus && !userName ? styles.instructions : styles.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Please enter your user name
            </p>
            <label htmlFor="login_password" className={styles.signUp_details}>
              Password
              <span>
                <FontAwesomeIcon
                  icon={faCheck}
                  className={password ? styles.valid : styles.hide}
                />
              </span>
            </label>
            <input
              type="password"
              id="login_password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              name="login_password"
              required
              className={styles.input_style}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id={styles.pwdnote}
              className={
                passwordFocus && !password
                  ? styles.instructions
                  : styles.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Please enter your password
            </p>
            <div className={styles.button}>
              <button
                type="submit"
                onClick={submit}
                className={styles.submit_btn}
              >
                Submit
              </button>
            </div>
          </form>
          <br />
          <p>OR</p>
          <br />
          <div className={styles.button}>
            <button onClick={signUpPageHandler} className={styles.signUp_btn}>
              Sign Up Page
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
