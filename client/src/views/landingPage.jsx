import { useNavigate } from "react-router-dom";
import "../styles/landingPage.css";

function LandingPage() {
  const link = useNavigate();

  function handleSignUpPage() {
    link("/signUp");
  }

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <ul className="nav-menu">
            <li className="nav-item" id="services">
              Services
            </li>
            <li className="nav-item" id="Logo">
              Money Slice
            </li>
            <li className="nav-item" id="login-btn">
              Login
            </li>
          </ul>
          <div className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
      <div className="wrapper">
        <body>
          <section className="main">
            <p className="main-text">
              Welcome to
              {/* <span id="Money">Money</span> */}
              <div id="Money">Money</div>
              <span id="Slice">Slice</span>
            </p>
            <p className="sub-text">
              Your go to <span id="pie-chart-txt">pie-chart</span> based <br />{" "}
              budgeting app.
            </p>
            <button className="sign-Up-btn" onClick={handleSignUpPage}>
              Sign Up
            </button>
          </section>
        </body>
      </div>
    </>
  );
}

export default LandingPage;
