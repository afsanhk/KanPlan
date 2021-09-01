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

  function deleteTask(id) {
    return axios.delete(`http://localhost:8001/api/tasks/${id}`).then(() => {
      // const tasks = {
      //   ...state.tasks,
      // }
      // //not manipulating state directly
      // delete tasks[id]
      // setState({
      //   ...state,
      //   tasks,
      // });
    });
  }

  return { state, loading, addTask, updateTaskStatus, deleteTask, getKanbanStatus, kanbanStatus };
}
