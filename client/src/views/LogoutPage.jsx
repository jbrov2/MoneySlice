import styles from "../styles/logout.module.css";
import { useNavigate } from "react-router-dom";

function Logout() {
  const history = useNavigate();
  const LOGOUT_URL = "http://localhost:5000/logout";
  function handleNo() {
    history("/home");
  }

  async function handleYes() {
    try {
      const response = await fetch(LOGOUT_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        history("/landingPage");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <section className={styles.main}>
          <div className={styles.logout_box}>
            <div className={styles.header}>
              <h1>Are you sure?</h1>
            </div>
            <div className={styles.buttons}>
              <button
                className={styles.button}
                id={styles.yes}
                onClick={handleYes}
              >
                Yes
              </button>
              <button
                className={styles.button}
                id={styles.no}
                onClick={handleNo}
              >
                No
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Logout;
