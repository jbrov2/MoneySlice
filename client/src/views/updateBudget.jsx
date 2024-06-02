import { useNavigate } from "react-router-dom";
import styles from "../styles/updateABudget.module.css";
import { useEffect, useState } from "react";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);
function UpdateBudget() {
  const navigate = useNavigate();

  const handleHomePage = () => navigate("/home");
  const handleCreatePage = () => navigate("/createAPie");
  const handleViewPage = () => navigate("/viewAPie");
  const handleUpdatePage = () => navigate("/updateApie");
  const handleDeletePage = () => navigate("/smashAPie");
  const handleLogout = () => navigate("/logout");

  //for viewing the budget
  const [budget, setBudget] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Spending",
        data: [],
        background: [
          "2F4B26",
          "3E885B",
          "85BDA6",
          "BEDCFE",
          "C0D7BB",
          "F3D3BD",
        ],
      },
    ],
  });
  //editing budget
  const [Budget_Amounted, setBudget_Amounted] = useState("");
  const [Category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemAmountSpent, setItemAmountSpent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  //after everything is said and done this effect will allow you to see the budget
  useEffect(() => {
    seeBudget();
  }, []);

  async function seeBudget() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/budget", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched budget data:", data);
      setBudget(data);
    } catch (error) {
      console.error("Error fetching budget", error);
    }
  }

  function handleBoxClick(budget) {
    console.log("Selected budget:", budget); // Debugging statement
    setSelectedBudget(budget);
    setChartData({
      labels: budget.items.map((item) => item.name),
      datasets: [
        {
          label: "Spending",
          data: budget.items.map((item) => item.amountSpent),
          backgroundColor: [
            "#2F4B26",
            "#3E885B",
            "#85BDA6",
            "#BEDCFE",
            "#C0D7BB",
            "#F3D3BD",
          ],
        },
      ],
    });
  }

  function handleEditButton() {
    setIsEditing(true);
    setCategory(selectedBudget.category);
    setBudget_Amounted(selectedBudget.budgetedAmount);
    setItems(selectedBudget.items);
  }

  async function handleSaveEdit() {
    const token = localStorage.getItem("accessToken");

    const Budgeted_Amount = parseFloat(Budget_Amounted);
    const requestBody = {
      Category,
      Budgeted_Amount: Budgeted_Amount,
      Item: items,
    };
    try {
      const response = await fetch("http://localhost:5000/budget", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();
    } catch (error) {
      console.error.eror("Failed to Parse JSON response:", error);
    }
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }
  //to set chart with new data
  useEffect(() => {
    setChartData({
      labels: items.map((item) => item.name),
      datasets: [
        {
          label: "Spending",
          data: items.map((item) => item.amount),
          backgroundColor: [
            "#2F4B26",
            "#3E885B",
            "#85BDA6",
            "#BEDCFE",
            "#C0D7BB",
            "#F3D3BD",
          ],
        },
      ],
    });
  }, [items]);

  function handleClosePopup() {
    setSelectedBudget(null);
  }

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
              <span className={styles.custom_text}>Update a Pie</span> !
            </h1>
          </div>
          <section className={styles.main_section}>
            <div className={styles.prompt}>
              <h2 className={styles.prompt_h2}>
                Choose a <span className={styles.custom_text}>PieChart</span> to
                update:
              </h2>
              {budget.length === 0 ? (
                <p className={styles.no_budget}>
                  No budgets are available. Please create a budget.
                </p>
              ) : (
                <div className={styles.budget_boxes}>
                  {" "}
                  {budget.map((budget, i) => (
                    <div
                      key={i}
                      className={styles.budget_box}
                      onClick={() => handleBoxClick(budget)}
                    >
                      <h3>{budget.category}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          {selectedBudget && (
            <div className={styles.popup}>
              <div className={styles.popup_content}>
                <h2>{selectedBudget.category}</h2>
                <p>Budgeted Amount: {selectedBudget.budgetedAmount}</p>
                <p>Actual Spending: {selectedBudget.actualSpending}</p>
                <p>Amount Remaining: {selectedBudget.remainingBudget}</p>
                <h3 className={styles.item_h3}>Items</h3>
                <div className={styles.chart_container}>
                  <Pie data={chartData}></Pie>
                </div>
                <div className={styles.button_holder}>
                  <button
                    className={styles.edit_button}
                    onClick={handleEditButton}
                  >
                    Edit Budget
                  </button>
                  <button
                    className={styles.close_button}
                    onClick={handleClosePopup}
                  >
                    Close
                  </button>
                </div>
                {isEditing && (
                  <div className={styles.popup_edit}>
                    <div className={styles.pop_edit_content}>
                      <h2>Edit Content</h2>
                      <div className={styles.prevSection}>
                        <p>Category: {selectedBudget.category}</p>
                        <p>Budgeted Amount: {selectedBudget.remainingBudget}</p>
                        <p>Name: {items[items.length - 1].name}</p>
                        <p>Amount: {items[items.length - 1].amount}</p>
                      </div>
                      <div className={styles.button_holder}>
                        <button
                          className={styles.save_button}
                          onClick={handleSaveEdit}
                        >
                          {" "}
                          Save
                        </button>
                        <button
                          className={styles.cancel_button}
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateBudget;
