import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element></Route>
          <Route path="/signUp" element></Route>
          <Route path="/home" element></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
