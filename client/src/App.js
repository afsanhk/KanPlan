// Libraries and frameworks
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import NavBar from "./components/NavBar";

// Styling
import "./App.scss";

function App() {
  return (
    <div className="App">
      <h1>KanPlan!</h1>
      <Router>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
