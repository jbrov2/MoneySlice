import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import styles from "../styles/landingPage.module.css";

function LandingPage() {
  const link = useNavigate();

  function handleLoginPage() {
    link("/login");
  }

  function handleSignUpPage() {
    link("/signUp");
  }

  return (
    <>
      {/* <header className="header">
        <nav className="navbar">
          <ul className="nav-menu">
            <li className="nav-item" id="services">
              Services
            </li>
            <li className="nav-item" id="Logo">
              Money Slice
            </li>
            <li className="nav-item" id="login-btn" onClick={handleLoginPage}>
              Login
            </li>
          </ul>
          <div className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header> */}
      <div className={`${styles.wrapper}`}>
        <section className={`${styles.main}`}>
          <div className={`${styles.title}`}>
            <h1>
              Money <span className={`${styles.splice}`}>Slice</span>
            </h1>
          </div>

          <div className={`${styles.landing}`}>
            <h3 className={`${styles.landing_text}`}>Your go to</h3>
            <h3
              className={`${styles.landing_text}`}
              id={`${styles.special_text}`}
            >
              pie chart
            </h3>
            <h3 className={`${styles.landing_text}`}>budgeting app</h3>
          </div>
          <button
            className={`${styles.signUp_btn}`}
            onClick={handleSignUpPage}
          ></button>
          <button
            className={`${styles.login_btn}`}
            onClick={handleLoginPage}
          ></button>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
