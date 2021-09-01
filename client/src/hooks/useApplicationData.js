import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    tasks: {},
    projects: {},
    users: {}
  });
  const [kanbanStatus, setKanbanStatus] = useState({});
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

  const addTask = async (newTask, projectID, taskUsersID) => {
    let taskID;
    return axios
      .post(`http://localhost:8001/api/tasks/`, newTask)
      .then((res) => {
        taskID = res.data.task_id;
      })
      .then(() => {
        const stateCopy = JSON.parse(JSON.stringify(state));

        stateCopy.tasks[taskID] = { ...newTask, id: taskID, kanban_order: -1 };
        stateCopy.projects[projectID].project_tasks = [...state.projects[projectID].project_tasks, taskID];

        taskUsersID.forEach((id) => {
          stateCopy.users[id].user_tasks = [...stateCopy.users[id].user_tasks, taskID];
          setState((prev) => ({ ...prev, ...stateCopy }));
        });
        console.log(state);
      });
  };

  const updateTaskStatus = (taskState) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    stateCopy.tasks[taskState.id].status = taskState.status;
    stateCopy.tasks[taskState.id].status_id = taskState.status;

    setState((prev) => ({ ...prev, ...stateCopy }));

    return axios.put(`http://localhost:8001/api/tasks/${taskState.id}/status`, taskState).catch((error) => console.log(error));
  };

  const getKanbanStatus = (projectID) => {
    return axios.get(`httpL//localhost:8001/api/kanban/project/${projectID}`).then((res) => {
      setKanbanStatus(res.data);
      console.log(res);
    });
  };

  function deleteTask(id, projectID, userID) {
    return axios.delete(`http://localhost:8001/api/tasks/${id}`).then(() => {
      console.log(`Inside deleteTask task-id:${id}, projectID: ${projectID}, userID: ${userID}`);
      // Create state copy
      const stateCopy = JSON.parse(JSON.stringify(state));

      console.log('State before manipulation', state);
      console.log('Copy of state before manipulation', stateCopy);
      // Only manipulate stateCopy
      // Remove task object from stateCopy.tasks
      delete stateCopy.tasks[id];
      // Remove task from project_tasks array --> Looks for the task ID inside project_tasks, removes it.
      const deletedProjectTaskIndex = stateCopy.projects[projectID].project_tasks.indexOf(id);
      if (deletedProjectTaskIndex > -1) {
        stateCopy.projects[projectID].project_tasks.splice(deletedProjectTaskIndex, 1);
      }
      console.log('State Project Tasks List', state.projects[projectID].project_tasks);
      console.log('State Copy Project Tasks List', stateCopy.projects[projectID].project_tasks);
      // Remove task from user_projects array --> Looks for the task ID inside user_projects, removes it.
      // If the task is not assigned to the user, doesn't do anything.
      const deletedUserTaskIndex = stateCopy.users[userID].user_tasks.indexOf(id);
      if (deletedUserTaskIndex > -1) {
        stateCopy.users[userID].user_tasks.splice(deletedUserTaskIndex, 1);
      }
      console.log('State User Tasks List', state.users[userID].user_tasks);
      console.log('State Copy User Tasks List', stateCopy.users[userID].user_tasks);
      // Finally, set state.
      console.log('State', state);
      console.log('State Copy', stateCopy);
      setState((prev) => ({ ...prev, ...stateCopy }));
    });
  }

  return { state, loading, addTask, updateTaskStatus, deleteTask, getKanbanStatus, kanbanStatus };
}
