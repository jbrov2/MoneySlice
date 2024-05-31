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

  useEffect(() => {
    console.log("Updated Items:", items);
  }, [items]);

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
      question: "Please provide a name for your slice",
      value: itemName,
      setter: setItemName,
    },
    {
      question: "Please provide an amount for your slice",
      value: itemAmountSpent,
      setter: setItemAmountSpent,
    },
  ];

  function handleNext() {
    console.log("step:", step);
    console.log("itemName:", itemName);
    console.log("itemAmountSpent:", itemAmountSpent);
    console.log("step === 2:", step === 2);
    console.log("itemName truthiness:", !!itemName); // Check if itemName is truthy
    console.log("itemAmountSpent truthiness:", !!itemAmountSpent); // Check if itemAmountSpent is truthy

    if (step === 3 && itemName && itemAmountSpent) {
      setItems([...items, { name: itemName, amount: itemAmountSpent }]);
      console.log("Updated Items:", items);
      setStep(4); // Move to the next step after adding an item
    } else if (questions[step].value || step === 4) {
      setStep((prev) => prev + 1);
    }
  }
  function handlePrev() {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  async function handleSaveBudget() {
    const token = localStorage.getItem("accessToken");

    const formattedItems = items.map((item, index) => ({
      Name: item.name,
      Amount_Spent: item.amount,
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

  const chartData = {
    labels: items.map((item) => item.name),
    datasets: [
      {
        label: "Spending",
        data: items.map((item) => item.amount),
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
  };

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
            {step < 4 ? (
              <div className={styles.question_container}>
                <p className={styles.questions}>{questions[step].question}</p>
                <input
                  type={step === 1 || step === 3 ? "number" : "text"}
                  value={questions[step].value}
                  onChange={(e) => questions[step].setter(e.target.value)}
                  className={styles.inputs}
                />
                <div className={styles.navigation_button}>
                  <button
                    onClick={handlePrev}
                    disabled={step === 0}
                    className={styles.nav_btn}
                  >
                    Previous
                  </button>
                  <button onClick={handleNext} className={styles.nav_btn}>
                    {step === 2 ? "Add Item" : "Next"}
                  </button>
                  {step === 2 && items.length > 0 && (
                    <button
                      onClick={() => setStep(4)}
                      className={styles.nav_btn}
                    >
                      Finish Adding Items
                    </button>
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
