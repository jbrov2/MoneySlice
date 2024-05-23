import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/homepage.module.css";

function Home() {
  const link = useNavigate();

  function handleCreatePage() {
    link("/createAPie");
  }

  function handleViewPage() {
    link("/viewAPie");
  }
  return (
    <>
      {/* <h1>Welcome to MoneySlice</h1>
      <h3>Would you like to create or view your budget</h3>
      <button onClick={handleViewPage}>View</button>
      <button onClick={handleCreatePage}>Create</button> */}
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <section className={styles.sidebar}></section>
          <div className={styles.welcome_banner}></div>
          <section className={styles.main_screen}>
            <h3>
              You currently have <span>X</span> <br></br> budgets available
            </h3>
            <h4>would you like to...</h4>
            <div className={styles.buttons}>
              <button></button> <button></button> <button></button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
