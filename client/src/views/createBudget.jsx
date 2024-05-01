import "../styles/createABudget.css";

function CreateAPie() {
  function prevSlideHandler() {}
  function nextSlideHandler() {}

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
            <li className="nav-item" id="logout-btn">
              Logout
            </li>
          </ul>
          <div className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
      <div>
        <h1>Welcome to Create a Pie</h1>
        <p>
          This is where you can create the budget pie chart you want to follow
        </p>
        <h3>Let us start by choosing a guideline budget you want to follow</h3>
        <div className="slider">
          <div className="slide">
            <h3 className="budget-name">50/30/20</h3>
            <h3 className="budget-name">Spending Cap</h3>
            <h3 className="budget-name">Zero Based</h3>
            <h3 className="budget-name">Custom</h3>
          </div>
          <button className="prev" onClick={prevSlideHandler}>
            &#10094
          </button>
          <button className="next" onClick={nextSlideHandler}>
            &#10095
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateAPie;
