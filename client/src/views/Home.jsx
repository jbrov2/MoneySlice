import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const location = useLocation();

  return (
    <>
      <h1>Welcome to MoneySlice {location.state.id}</h1>
    </>
  );
}

export default Home;
