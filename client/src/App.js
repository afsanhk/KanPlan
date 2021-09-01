// Libraries and frameworks
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import useApplicationData from './hooks/useApplicationData';

// Components & Pages
import NavBar from './components/NavBar';
import UserDashboard from './pages/UserDashboard';
import UserProjects from './pages/UserProjects';
import ProjectOverview from './pages/ProjectOverview';
import ProjectKanban from './pages/ProjectKanban';
import ProjectGantt from './pages/ProjectGantt';
import LoadingCircle from './components/LoadingCircle';

// Styling
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import './styles/App.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
      dark: '#4b9fea' //this color is actually lighter, is visible when hovering over buttons
    },
    secondary: {
      main: '#e03838',
      dark: '#ff5252' //this color is actually lighter, is visible when hovering over buttons
    }
  },
  typography: {
    fontSize: 16,
    h3: {
      fontSize: '3.4rem'
    }
  },
  overrides: {
    // Style sheet name ⚛️
    MuiAvatar: {
      root: {
        width: '30px',
        height: '30px',
        'font-size': '15px'
      },
      colorDefault: {
        'background-color': '#1e88e5'
      }
    }
  }
});

function App() {
  const { state, loading, deleteTask, addTask, updateTaskStatus, getKanbanStatus, kanbanStatus } = useApplicationData();

  // Change this projectID to see reflected changes in gantt based on state.
  // In reality we will need to pass this in based on which project we are routing from
  const projectID = 1;
  const userID = 1;

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          {loading ? (
            <LoadingCircle />
          ) : (
            <div className="body">
              <Switch>
                <Route exact path="/">
                  <UserDashboard state={state} userID={userID} />
                </Route>
                <Route path="/projects">
                  <UserProjects state={state} userID={userID} />
                </Route>
                <Route path="/project/:projectID/overview">
                  <ProjectOverview state={state} deleteTask={deleteTask} />
                </Route>
                <Route path="/project/:projectID/kanban">
                  <ProjectKanban state={state} addTask={addTask} updateTaskStatus={updateTaskStatus} getKanbanStatus={getKanbanStatus} kanbanStatus={kanbanStatus} />
                </Route>
                <Route path="/project/:projectID/gantt">
                  <ProjectGantt state={state} />
                </Route>
                <Route path="*">
                  <h1>404 - Not Found</h1>
                </Route>
              </Switch>
            </div>
          )}
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
