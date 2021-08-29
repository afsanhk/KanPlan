// Libraries and frameworks
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import useApplicationData from './hooks/useApplicationData';

// Components & Pages
import NavBar from './components/NavBar';
import UserDashboard from './pages/UserDashboard';
import UserProjects from './pages/UserProjects';
import ProjectOverview from './pages/ProjectOverview';
import ProjectKanban from './pages/ProjectKanban';
import ProjectGantt from './pages/ProjectGantt';

// Styling
import './App.scss';

function App() {
  const { state } = useApplicationData();

  return (
    <div className="App">
      <Router>
        {/* <h1>KanPlan!</h1> */}
        <NavBar />
        <Switch>
          <Route exact path="/">
            <UserDashboard />
            {console.log(state.tasks)}
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
