// Libraries and frameworks
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import useApplicationData from "./hooks/useApplicationData";

// Components & Pages
import NavBar from "./components/NavBar";
import UserDashboard from "./pages/UserDashboard";
import UserProjects from "./pages/UserProjects";
import ProjectOverview from "./pages/ProjectOverview";
import ProjectKanban from "./pages/ProjectKanban";
import ProjectGantt from "./pages/ProjectGantt";

// Styling
import "./App.scss";

function App() {
  const { state } = useApplicationData();

  // Change this projectID to see reflected changes in gantt based on state.
  // In reality we will need to pass this in based on which project we are routing from
  const projectID = 2;
  const userID = 1;

  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="body">
          <Switch>
            <Route exact path="/">
              <UserDashboard state={state} userID={userID} />
            </Route>
            <Route path="/projects">
              <UserProjects />
            </Route>
            {/* This will need to change to become a dynamic link. */}
            <Route path="/project/overview">
              <ProjectOverview />
            </Route>
            {/* This will need to change to become a dynamic link. */}
            <Route path="/project/kanban">
              <ProjectKanban state={state} projectID={projectID} />
            </Route>
            {/* This will need to change to become a dynamic link. */}
            <Route path="/project/gantt">
              <ProjectGantt state={state} projectID={projectID} />
            </Route>
            {/* Do we want a 404 page? */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
