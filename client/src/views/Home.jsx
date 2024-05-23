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
          <section className={styles.sidebar}>
            <h2>MS</h2>
            <div className={styles.selection}>
              {/* Home Button */}
              <input
                type="radio"
                value="Home"
                name="Home_button"
                id="radio_Home"
                className="radio_button"
              />
              <label htmlFor="radio_Home">Home</label>
              {/* Budget Button */}
              <input
                type="radio"
                value="Budgets"
                name="Budget_button"
                id="radio_Budgets"
                className="radio_button"
              />
              <label htmlFor="radio_Budgets">Budgets</label>
              {/* View Button */}
              <input
                type="radio"
                value="View"
                name="View_button"
                id="radio_View"
                className="radio_button"
              />
              <label htmlFor="radio_View">View</label>
              {/* Make Button */}
              <input
                type="radio"
                value="Make"
                name="Make_button"
                id="radio_Make"
                className="radio_button"
              />
              <label htmlFor="radio_Make">Make</label>
              {/* Update Button */}
              <input
                type="radio"
                value="Update"
                name="Update_button"
                id="radio_Update"
                className="radio_button"
              />
              <label htmlFor="radio_Update">Update</label>
              {/* Delete Button */}
              <input
                type="radio"
                value="Delete"
                name="Delete_button"
                id="radio_Delete"
                className="radio_button"
              />
              <label htmlFor="radio_Delete">Delete</label>
              {/* Logout Button */}
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
          <div className={styles.welcome_banner}></div>
          <section className={styles.main_screen}>
            <h3>
              You currently have <span>X</span> <br></br> budgets available
            </h3>
            <h4>would you like to...</h4>
            <div className={styles.buttons}>
              <button
                className={styles.mainscreen_button}
                id={styles.view_budget}
              >
                View
              </button>{" "}
              <button
                className={styles.mainscreen_button}
                id={styles.make_budget}
              >
                Make
              </button>{" "}
              <button
                className={styles.mainscreen_button}
                id={styles.edit_budget}
              >
                Edit
              </button>{" "}
              <button
                className={styles.mainscreen_button}
                id={styles.delete_budget}
              >
                Delete
              </button>
            </div>
            <h4>a budget?</h4>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
