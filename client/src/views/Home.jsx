import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  return (
    <>
      <h1>Welcome to MoneySlice {location.state.id}</h1>
      <h3>Would you like to create or view your budget</h3>
      <button>View</button>
      <button>Create</button>
    </>
  );
}

export default Home;
