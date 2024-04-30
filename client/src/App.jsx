import "./App.css";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./views/landingPage";
import CreateAPie from "./views/createBudget";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/createAPie" element={<CreateAPie></CreateAPie>}></Route>
          <Route
            path="/landingPage"
            element={<LandingPage></LandingPage>}
          ></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/signUp" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="" element={<Navigate to="/landingPage" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
