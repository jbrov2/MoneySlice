import styles from "../styles/createABudget.module.css";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJs } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useState } from "react";

function CreateAPie() {
  const navigate = useNavigate();

  const handleHomePage = () => navigate("/home");
  const handleCreatePage = () => navigate("/createAPie");
  const handleViewPage = () => navigate("/viewAPie");
  const handleUpdatePage = () => navigate("/updateApie");
  const handleDeletePage = () => navigate("/smashAPie");
  const handleLogout = () => navigate("/logout");

  const [category, setCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState();
  const [itemName, setItemName] = useState("");
  const [itemAmountSpent, setItemAmountSpent] = useState();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <section className={styles.sidebar}>
            <div className={styles.logo}>
              <h2>MS</h2>
            </div>

            <div className={styles.selection}>
              <div className={styles.sidescreen_links}>
                <ul>
                  <li className={styles.links} onClick={handleHomePage}>
                    Home
                  </li>
                  <li className={styles.links} id={styles.static}>
                    Budgets
                  </li>
                  <li
                    className={styles.links}
                    id={styles.chosen_link}
                    onClick={handleViewPage}
                  >
                    View
                  </li>
                  <li className={styles.links} onClick={handleCreatePage}>
                    {" "}
                    Make
                  </li>
                  <li className={styles.links} onClick={handleUpdatePage}>
                    Update
                  </li>
                  <li className={styles.links} onClick={handleDeletePage}>
                    Delete
                  </li>
                  <li
                    className={styles.links}
                    id={styles.logout_link}
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <div className={styles.welcome_banner}>
            <h1 className={styles.h1_text}>
              Welcome to{" "}
              <span className={styles.custom_text}>Create a Pie</span>!
            </h1>
          </div>
          <section className={styles.chart_area}>
            <div className={styles.PieChart}>
              {/* <Pie
                data={{
                  labels: ["A", "B", "C"],
                  datasets: [
                    {
                      label: "Revenue",
                      data: [200, 300, 400],
                    },
                  ],
                }}
              /> */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default CreateAPie;
