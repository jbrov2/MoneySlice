import "./App.css";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./views/landingPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/landingPage"
            element={<LandingPage></LandingPage>}
          ></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/signUp" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
