import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const location = useLocation();
  const link = useNavigate();

  function handleCreatePage() {
    link("/createAPie");
  }

  function handleViewPage() {
    link("/viewAPie");
  }
  return (
    <>
      <h1>Welcome to MoneySlice</h1>
      <h3>Would you like to create or view your budget</h3>
      <button onClick={handleViewPage}>View</button>
      <button onClick={handleCreatePage}>Create</button>
    </>
  );
}

export default Home;
