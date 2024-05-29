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
import ViewAPie from "./views/viewBudget";
import UpdateAPie from "./views/updateBudget";
import DeleteApie from "./views/deleteBudget";
import LogoutPage from "./views/LogoutPage";
// Supports weights 100-800
import "@fontsource-variable/sora";
import "@fontsource/krona-one";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/logout" element={<LogoutPage></LogoutPage>}></Route>
          <Route path="/smashAPie" element={<DeleteApie></DeleteApie>}></Route>
          <Route path="/updateAPie" element={<UpdateAPie></UpdateAPie>}></Route>
          <Route path="/createAPie" element={<CreateAPie></CreateAPie>}></Route>
          <Route path="/viewAPie" element={<ViewAPie></ViewAPie>} />
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
