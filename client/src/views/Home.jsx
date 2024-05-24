import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/homepage.module.css";

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [budgetCount, setBudgetCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
            <input
              type="radio"
              value="Home"
              name="Home_button"
              id="radio_Home"
              className="radio_button"
            />
            <label htmlFor="radio_Home">Home</label>
            <input
              type="radio"
              value="Budgets"
              name="Budget_button"
              id="radio_Budgets"
              className="radio_button"
            />
            <label htmlFor="radio_Budgets">Budgets</label>
            <input
              type="radio"
              value="View"
              name="View_button"
              id="radio_View"
              className="radio_button"
            />
            <label htmlFor="radio_View">View</label>
            <input
              type="radio"
              value="Make"
              name="Make_button"
              id="radio_Make"
              className="radio_button"
            />
            <label htmlFor="radio_Make">Make</label>
            <input
              type="radio"
              value="Update"
              name="Update_button"
              id="radio_Update"
              className="radio_button"
            />
            <label htmlFor="radio_Update">Update</label>
            <input
              type="radio"
              value="Delete"
              name="Delete_button"
              id="radio_Delete"
              className="radio_button"
            />
            <label htmlFor="radio_Delete">Delete</label>
            <input
              type="radio"
              value="Logout"
              name="Logout_button"
              id="radio_Logout"
              className="radio_button"
            />
            <label htmlFor="radio_Logout">Logout</label>
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
