// Libraries and frameworks
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { authContext } from "./providers/AuthProvider.js";

import useApplicationData from "./hooks/useApplicationData";

// Components & Pages
import NavBar from "./components/NavBar";
import UserDashboard from "./pages/UserDashboard";
import UserProjects from "./pages/UserProjects";
import ProjectOverview from "./pages/ProjectOverview";
import ProjectKanban from "./pages/ProjectKanban";
import ProjectGantt from "./pages/ProjectGantt";
import LoadingCircle from "./components/LoadingCircle";
import Login from "./pages/Login";

// Styling
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./styles/App.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e88e5",
      dark: "#4b9fea", //this color is actually lighter, is visible when hovering over buttons
    },
    secondary: {
      main: "#e03838",
      dark: "#ff5252", //this color is actually lighter, is visible when hovering over buttons
    },
  },
  typography: {
    fontSize: 16,
    h3: {
      fontSize: "3.4rem",
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiAvatar: {
      root: {
        width: "30px",
        height: "30px",
        "font-size": "15px",
      },
      colorDefault: {
        "background-color": "#54aeff",
      },
    },
    MuiLinearProgress: {
      barColorPrimary: {
        "background-color": "#3d6bb3",
      },
    },
    MuiTableCell: {
      stickyHeader: {
        "z-index": 10,
      },
    },
    MuiBackdrop: {
      root: {
        "background-color": "rgba(0, 0, 0, 0.3)",
      },
    },
  },
});

function App() {
  const {
    state,
    loading,
    deleteTask,
    editTask,
    addTask,
    updateTaskStatus,
    getKanbanStatus,
    kanbanStatus,
    addProject,
    deleteProject,
    updateProjectUsers,
    updateTaskPriority,
    updateKanbanOrder,
    editProject,
  } = useApplicationData();

  // const { auth, userID } = useContext(authContext);
  // Change this projectID to see reflected changes in gantt based on state.
  // In reality we will need to pass this in based on which project we are routing from
  // console.log("Inside App.js userID is:", userID);

  const userID = 1
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* {!auth && <Login users={state.users} />}
        {auth && ( */}
          <Router>
            <NavBar userID={userID} />
            {loading ? (
              <LoadingCircle />
            ) : (
              <div className="body">
                <Switch>
                  <Route exact path="/">
                    <UserDashboard state={state} userID={userID} deleteTask={deleteTask} editTask={editTask} />
                  </Route>
                  <Route path="/projects">
                    <UserProjects
                      state={state}
                      userID={userID}
                      addProject={addProject}
                      deleteProject={deleteProject}
                      updateProjectUsers={updateProjectUsers}
                    />
                  </Route>
                  <Route path="/project/:projectID/overview">
                    <ProjectOverview
                      state={state}
                      userID={userID}
                      deleteTask={deleteTask}
                      deleteProject={deleteProject}
                      updateProjectUsers={updateProjectUsers}
                      addTask={addTask}
                      editTask={editTask}
                      updateTaskStatus={updateTaskStatus}
                      updateTaskPriority={updateTaskPriority}
                      editProject={editProject}
                    />
                  </Route>
                  <Route path="/project/:projectID/kanban">
                    <ProjectKanban
                      state={state}
                      addTask={addTask}
                      updateKanbanOrder={updateKanbanOrder}
                      getKanbanStatus={getKanbanStatus}
                      kanbanStatus={kanbanStatus}
                      updateProjectUsers={updateProjectUsers}
                    />
                  </Route>
                  <Route path="/project/:projectID/gantt">
                    <ProjectGantt state={state} updateProjectUsers={updateProjectUsers} />
                  </Route>
                  <Route path="*">
                    <h1>404 - Not Found</h1>
                  </Route>
                </Switch>
              </div>
            )}
          </Router>
        {/* )} */}
      </div>
    </ThemeProvider>
  );
}

export default App;
