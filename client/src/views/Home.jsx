import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/homepage.module.css";

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [budgetCount, setBudgetCount] = useState(0);

  useEffect(() => {
    //also grabbing the access token
    const fetchUserData = async () => {
      try {
        //Get the accss token
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        //now make the request
        const response = await fetch("http://localhost:5000/user/info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          // credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserName(data.userName);
        setBudgetCount(data.budgetCount);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCreatePage = () => navigate("/createAPie");
  const handleViewPage = () => navigate("/viewAPie");

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <section className={styles.sidebar}>
          <h2>MS</h2>
          <div className={styles.selection}>
            <div className={styles.sidescreen_links}>
              <ul>
                <li className={styles.links}>Home</li>
                <li className={styles.links} id={styles.static}>
                  Budgets
                </li>
                <li className={styles.links} id={styles.chosen_link}>
                  View
                </li>
                <li className={styles.links}>Make</li>
                <li className={styles.links}>Update</li>
                <li className={styles.links}>Delete</li>
                <li className={styles.links} id={styles.logout_link}>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className={styles.welcome_banner}>
          <h1 className={styles.h1_text}>
            Welcome <span className={styles.userName}>{userName}!</span>
          </h1>
        </div>
        <section className={styles.main_screen}>
          <h3>
            You currently have <span>{budgetCount}</span> budgets available
          </h3>
          <h4>Would you like to...</h4>
          <div className={styles.buttons}>
            <button
              className={styles.mainscreen_button}
              onClick={handleViewPage}
            >
              View
            </button>
            <button
              className={styles.mainscreen_button}
              onClick={handleCreatePage}
            >
              Make
            </button>
            <button className={styles.mainscreen_button}>Edit</button>
            <button className={styles.mainscreen_button}>Delete</button>
          </div>
          <h4>a budget?</h4>
        </section>
      </div>
    </div>
  );
}

export default Home;
