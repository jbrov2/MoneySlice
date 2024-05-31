import styles from "../styles/createABudget.module.css";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";

// Register the necessary Chart.js components
ChartJs.register(ArcElement, Tooltip, Legend);

function CreateAPie() {
  const navigate = useNavigate();

  const handleHomePage = () => navigate("/home");
  const handleCreatePage = () => navigate("/createAPie");
  const handleViewPage = () => navigate("/viewAPie");
  const handleUpdatePage = () => navigate("/updateApie");
  const handleDeletePage = () => navigate("/smashAPie");
  const handleLogout = () => navigate("/logout");

  const [step, setStep] = useState(0);
  const [Category, setCategory] = useState("");
  const [Budget_Amount, setBudgetAmount] = useState("");
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemAmountSpent, setItemAmountSpent] = useState("");
  const [currentItemIndex, setCurrentItemIndex] = useState(1);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Spending",
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  });

  const questions = [
    {
      question: "Please provide a Category Name for your budget.",
      value: Category,
      setter: setCategory,
    },
    {
      question: "Please provide a budget amount for the Category.",
      value: Budget_Amount,
      setter: setBudgetAmount,
    },
    {
      question: `Please provide a name for your slice #${currentItemIndex}`,
      value: itemName,
      setter: setItemName,
    },
    {
      question: `Please provide an amount for your slice #${currentItemIndex}`,
      value: itemAmountSpent,
      setter: setItemAmountSpent,
    },
    {
      question: `Would you like to add another slice or save your budget.`,
    },
  ];

  function handleNext() {
    if (questions[step]?.value || step >= questions.length) {
      setStep((prev) => prev + 1);
    }
  }

  function handleAddItem() {
    if (itemName && itemAmountSpent) {
      setItems([
        ...items,
        { name: itemName, amount: parseFloat(itemAmountSpent) },
      ]);
      setItemName("");
      setItemAmountSpent("");
      setCurrentItemIndex((prev) => prev + 1);
      setStep(2);
    }
  }

  function handlePrev() {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  async function handleSaveBudget() {
    const token = localStorage.getItem("accessToken");

    // Check if Budget_Amount is provided
    if (!Budget_Amount) {
      console.error("Budgeted Amount is required.");
      return;
    }

    // Create a temporary array that includes the final item
    const allItems = [
      ...items,
      { name: itemName, amount: parseFloat(itemAmountSpent) },
    ];

    const formattedItems = allItems.map((item, index) => ({
      Name: item.name,
      Amount_Spent: parseFloat(item.amount),
      ID: index + 1,
    }));

    console.log("Formatted Items:", formattedItems); // Log the formatted items before sending the request
    const response = await fetch("http://localhost:5000/budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Category,
        Budget_Amount: parseFloat(Budget_Amount),
        Item: formattedItems,
      }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return;
    }

    try {
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(`Failed to parse JSON response:`, error);
    }
  }

  useEffect(() => {
    setChartData({
      labels: items.map((item) => item.name),
      datasets: [
        {
          label: "Spending",
          data: items.map((item) => parseFloat(item.amount)),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    });
  }, [items]);

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
          <section className={styles.PieBulder}>
            {step < 5 ? (
              <div className={styles.question_container}>
                <p className={styles.questions}>
                  {questions[step]?.question || ""}
                </p>
                {step < 4 && (
                  <input
                    type={step === 1 || step === 3 ? "number" : "text"}
                    value={questions[step]?.value || ""}
                    onChange={(e) => questions[step]?.setter(e.target.value)}
                    className={styles.inputs}
                  />
                )}
                <div className={styles.navigation_button}>
                  <button
                    onClick={handlePrev}
                    disabled={step === 0}
                    className={styles.nav_btn}
                  >
                    Previous
                  </button>
                  {step < 4 && (
                    <button onClick={handleNext} className={styles.nav_btn}>
                      Next
                    </button>
                  )}
                  {step === 4 && (
                    <>
                      <button
                        onClick={handleAddItem}
                        className={styles.nav_btn}
                      >
                        Add Item
                      </button>
                      <button
                        onClick={() => setStep(5)}
                        className={styles.nav_btn}
                      >
                        Finish Adding Items
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.save_btn_holder}>
                <button onClick={handleSaveBudget} className={styles.save_btn}>
                  Save Budget
                </button>
              </div>
            )}
            {items.length > 0 && (
              <div className={styles.item_log}>
                <h3>Last Added Item:</h3>
                <p>Name: {items[items.length - 1].name}</p>
                <p>Amount: {items[items.length - 1].amount}</p>
              </div>
            )}
          </section>
          <section className={styles.chart_area}>
            <div className={styles.PieChart}>
              <Pie data={chartData}></Pie>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default CreateAPie;
