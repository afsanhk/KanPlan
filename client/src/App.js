// Libraries and frameworks
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components & Pages
import NavBar from './components/NavBar';
import UserDashboard from './pages/userDashboard';
import UserProjects from './pages/userProjects';
import ProjectOverview from './pages/projectOverview';
import ProjectKanban from './pages/projectKanban';
import ProjectGantt from './pages/projectGantt';

// Styling
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <h1>KanPlan!</h1> */}
        <NavBar />
        <Switch>
          <Route exact path="/">
            <UserDashboard />
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
            <ProjectKanban />
          </Route>
          {/* This will need to change to become a dynamic link. */}
          <Route path="/project/gantt">
            <ProjectGantt />
          </Route>
          {/* Do we want a 404 page? */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
