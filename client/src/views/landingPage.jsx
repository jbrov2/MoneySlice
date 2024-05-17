import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { classes, id } from "../styles/landingPage.module.css";

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
      <div className={`${classes.wrapper}`}>
        <body>
          <section className={`${classes.main}`}>
            <div className={`${classes.title_circle}`}>
              <div className={`${classes.title}`}>
                <h1>Money Slice</h1>
              </div>
            </div>
            <div className={`${classes.landing}`}>
              <h3 className={`${classes.landing_text}`}>Your go to</h3>
              <h3
                className={`${classes.landing_text}`}
                id={`${id.special_text}`}
              >
                pie chart
              </h3>
              <h3 className={`${classes.landing_text}`}>budgeting app</h3>
            </div>
            <button
              className={`${classes.signUp_btn}`}
              onClick={handleSignUpPage}
            ></button>
            <button
              className={`${classes.login_btn}`}
              onClick={handleLoginPage}
            ></button>
          </section>
        </body>
      </div>
    </>
  );
}

export default LandingPage;
