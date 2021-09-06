import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    tasks: {},
    projects: {},
    users: {}
  });
  const [kanbanStatus, setKanbanStatus] = useState([{ task_id: [] }, { task_id: [] }, { task_id: [] }, { task_id: [] }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([axios.get('http://localhost:8001/api/tasks'), axios.get('http://localhost:8001/api/projects'), axios.get('http://localhost:8001/api/users')]).then((all) => {
      //updates the state with all the information received from the axios get requests
      setState((prev) => ({
        ...prev,
        tasks: all[0].data,
        projects: all[1].data,
        users: all[2].data
      }));
      setLoading(false);
    });
  }, []); //empty square brackets ensures that this useEffect is only ran once during page load

  const addTask = (newTask, projectID, taskUsersID) => {
    let taskID;
    return axios
      .post(`http://localhost:8001/api/tasks/`, newTask)
      .then((res) => {
        taskID = res.data.task_id;
      })
      .then(() => {
        const stateCopy = JSON.parse(JSON.stringify(state));

        stateCopy.tasks[taskID] = { ...newTask, id: taskID, kanban_order: -1 };
        stateCopy.projects[projectID].project_tasks = [...stateCopy.projects[projectID].project_tasks, taskID];

        taskUsersID.forEach((id) => {
          stateCopy.users[id].user_tasks = [...stateCopy.users[id].user_tasks, taskID];
          setState((prev) => ({ ...prev, ...stateCopy }));
        });
        console.log('Inside add Task STATECOPY:', stateCopy); //.tasks[taskID].status); //no status?
      });
  };

  // update task's status, status_id, kanban_order
  const updateTaskStatus = (taskState, taskID) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    if (stateCopy.tasks[taskID].status) {
      stateCopy.tasks[taskID].status = taskState.status;
    }
    if (stateCopy.tasks[taskID].status_id) {
      stateCopy.tasks[taskID].status_id = taskState.status_id;
    }

    return axios
      .put(`http://localhost:8001/api/tasks/${taskID}/status`, { ...taskState, id: taskID })
      .then(() => {
        setState((prev) => ({ ...prev, tasks: { ...prev.tasks, [taskID]: stateCopy.tasks[taskID] } }));
      })
      .catch((error) => console.log(error));
  };

  // update task's priority, priority_id
  const updateTaskPriority = (priorityState, taskID) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    if (stateCopy.tasks[taskID].priority_name) {
      stateCopy.tasks[taskID].priority_name = priorityState.priority_name;
    }
    if (stateCopy.tasks[taskID].priority_id) {
      stateCopy.tasks[taskID].priority_id = priorityState.priority_id;
    }

    return axios
      .put(`http://localhost:8001/api/tasks/${taskID}/priority`, { ...priorityState, id: taskID })
      .then(() => {
        setState((prev) => ({ ...prev, tasks: { ...prev.tasks, [taskID]: stateCopy.tasks[taskID] } }));
      })
      .catch((error) => console.log(error));
  };

  const editTask = async (newTaskData, taskID) => {
    const statusToID = {
      'To-Do': 1,
      Late: 2,
      'In Progress': 3,
      Done: 4
    };
    const priorityToID = {
      None: 1,
      Low: 2,
      High: 3
    };
    const stateCopy = JSON.parse(JSON.stringify(state));

    stateCopy.tasks[taskID].title = newTaskData.title;
    stateCopy.tasks[taskID].task_description = newTaskData.task_description;
    stateCopy.tasks[taskID].plan_start = newTaskData.plan_start;
    stateCopy.tasks[taskID].plan_end = newTaskData.plan_end;
    stateCopy.tasks[taskID].task_users = newTaskData.task_users;

    if (newTaskData.priority_name) {
      stateCopy.tasks[taskID].priority_id = priorityToID[newTaskData.priority_name];
      stateCopy.tasks[taskID].priority_name = newTaskData.priority_name;
    }

    if (newTaskData.status) {
      stateCopy.tasks[taskID].status_id = statusToID[newTaskData.status];
      stateCopy.tasks[taskID].status = newTaskData.status;
    }

    const newTaskFullData = stateCopy.tasks[taskID];

    //go through old task users, compare to new task users, go to that users/user_tasks, delete task_id
    const oldArrayOfUsers = state.tasks[taskID].task_users;
    const newArrayOfUsers = newTaskFullData.task_users;

    const deletedUsers = oldArrayOfUsers.filter((task_user) => !newArrayOfUsers.includes(task_user));

    if (deletedUsers.length) {
      deletedUsers.forEach((userID) => {
        const taskIndex = stateCopy.users[userID].user_tasks.indexOf(taskID);
        stateCopy.users[userID].user_tasks.splice(taskIndex, 1);

        // setState((prev) => ({
        //   ...prev,
        //   ...stateCopy
        // }));
      });
    }

    //find out who are the new users, go to that users/user_tasks and add task_id

    const newUsers = newArrayOfUsers.filter((task_user) => !oldArrayOfUsers.includes(task_user));

    if (newUsers.length) {
      newUsers.forEach((userID) => {
        stateCopy.users[userID].user_tasks.push(taskID);

        // setState((prev) => ({
        //   ...prev,
        //   ...stateCopy
        // }));
      });
    }

    return axios
      .put(`http://localhost:8001/api/tasks/${taskID}`, { newTaskFullData })
      .then(() => {
        setState((prev) => {
          console.log({ ...prev, ...stateCopy });
          return {
            ...prev,
            ...stateCopy
          };
        });
      })
      .catch((error) => console.log(error));
  };

  // get kanban status from api
  const getKanbanStatus = (projectID) => {
    return axios.get(`http://localhost:8001/api/kanban/project/${projectID}`).then((res) => {
      setKanbanStatus(res.data);
    });
  };

  const updateKanbanOrder = (projectID, statusIDs, kanbanOrders) => {
    const idToStatus = {
      1: 'To-Do',
      2: 'Late',
      3: 'In Progress',
      4: 'Done'
    };
    const stateCopy = JSON.parse(JSON.stringify(state));

    statusIDs.forEach((statusID, index) => {
      kanbanOrders[index].forEach((taskID, index) => {
        stateCopy.tasks[taskID].kanban_order = index;
        stateCopy.tasks[taskID].status_id = statusID;
        stateCopy.tasks[taskID].status = idToStatus[statusID];
      });
    });

    return axios
      .put(`http://localhost:8001/api/kanban/project/${projectID}`, { statusIDs, kanbanOrders })
      .then((res) => console.log(res))
      .then(() => setState((prev) => ({ ...prev, ...stateCopy })))
      .catch((error) => console.log(error));
  };

  //
  const updateProjectUsers = (projectID, userID, originalMembers, teamMembers, userProjects) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    stateCopy.users[userID].user_projects = userProjects;

    stateCopy.projects[projectID].team_members = teamMembers;
    // in case user is removed
    if (originalMembers.length > teamMembers.length) {
      const deletedMembers = originalMembers.filter(function (el) {
        return teamMembers.indexOf(el) < 0;
      });
      deletedMembers.forEach((memberID) => {
        stateCopy.users[memberID].user_projects.splice(stateCopy.users[memberID].user_projects.indexOf(projectID), 1);
        stateCopy.users[memberID].user_tasks.forEach((taskID) => {
          if (stateCopy.tasks[taskID] && stateCopy.tasks[taskID].project_id === projectID) {
            stateCopy.tasks[taskID].task_users.splice(stateCopy.tasks[taskID].task_users.indexOf(memberID), 1);
          }
        });
      });
    }

    setState((prev) => ({ ...prev, ...stateCopy }));
  };

  function deleteTask(id, projectID, userID) {
    return axios.delete(`http://localhost:8001/api/tasks/${id}`).then(() => {
      // Create state copy
      const stateCopy = JSON.parse(JSON.stringify(state));
      // Only manipulate stateCopy
      // Remove task object from stateCopy.tasks
      delete stateCopy.tasks[id];
      // Remove task from project_tasks array --> Looks for the task ID inside project_tasks, removes it.
      const deletedProjectTaskIndex = stateCopy.projects[projectID].project_tasks.indexOf(id);
      if (deletedProjectTaskIndex > -1) {
        stateCopy.projects[projectID].project_tasks.splice(deletedProjectTaskIndex, 1);
      }
      // Remove task from user_tasks array --> Looks for the task ID inside user_tasks, removes it.
      // If the task is not assigned to the user, doesn't do anything.
      const deletedUserTaskIndex = stateCopy.users[userID].user_tasks.indexOf(id);
      if (deletedUserTaskIndex > -1) {
        stateCopy.users[userID].user_tasks.splice(deletedUserTaskIndex, 1);
      }
      // Finally, set state.
      setState((prev) => ({ ...prev, ...stateCopy }));
    });
  }

  //
  function addProject(newProject) {
    // console.log(`Inside addProject: newProject  ${JSON.stringify(newProject)}`);
    let projectID;
    return axios
      .post(`http://localhost:8001/api/projects/`, newProject)
      .then((res) => {
        // Capture new project ID
        projectID = res.data.project_id;
      })
      .then(() => {
        // Create stateCopy
        const stateCopy = JSON.parse(JSON.stringify(state));
        // Add new project to state copy, set project_tasks to null
        stateCopy.projects[projectID] = {
          ...newProject,
          id: projectID,
          manager_name: newProject.manager_name,
          project_tasks: [null]
        };
        console.log('State Inside addProject: ', stateCopy.projects);
        // For each team member, add the project ID user_projects
        newProject.team_members.forEach((memberID) => stateCopy.users[memberID].user_projects.push(projectID));
        // Set state.
        setState((prev) => ({ ...prev, ...stateCopy }));
      });
  }

  //id is the project id
  function deleteProject(id) {
    return axios.delete(`http://localhost:8001/api/projects/${id}`).then(() => {
      const stateCopy = JSON.parse(JSON.stringify(state));

      //remove project from user[user_projects]
      const projectMembers = stateCopy.projects[id].team_members;

      projectMembers.forEach((userID) => {
        const projectIndex = stateCopy.users[userID].user_projects.indexOf(id);
        stateCopy.users[userID].user_projects.splice(projectIndex, 1);
      });

      //remove tasks from project
      const projectTasks = stateCopy.projects[id].project_tasks;

      projectTasks.forEach((taskID) => {
        delete stateCopy.tasks[taskID];
      });

      //remove tasks from users
      projectMembers.forEach((userID) => {
        projectTasks.forEach((taskID) => {
          const projectTaskUnderUserIndex = stateCopy.users[userID].user_tasks.indexOf(taskID);

          if (projectTaskUnderUserIndex > -1) {
            stateCopy.users[userID].user_tasks.splice(projectTaskUnderUserIndex, 1);
          }
        });
      });

      //remove project from stateCopy.projects
      delete stateCopy.projects[id];

      setState((prev) => ({ ...prev, ...stateCopy }));
    });
  }

  //this function updates the project's title and description
  function editProject(newProjectData, projectID) {
    const stateCopy = JSON.parse(JSON.stringify(state));

    stateCopy.projects[projectID].proj_name = newProjectData.proj_name;
    stateCopy.projects[projectID].proj_description = newProjectData.proj_description;

    const newProjectFullData = stateCopy.projects[projectID];

    setState((prev) => ({
      ...prev,
      projects: { ...prev.projects, [projectID]: stateCopy.projects[projectID] }
    }));

    return axios.put(`http://localhost:8001/api/projects/${projectID}`, { newProjectFullData }).catch((error) => console.log(error));
  }

  return {
    state,
    loading,
    addTask,
    updateTaskStatus,
    updateTaskPriority,
    deleteTask,
    editTask,
    deleteProject,
    addProject,
    updateProjectUsers,
    getKanbanStatus,
    kanbanStatus,
    updateKanbanOrder,
    editProject
  };
}
