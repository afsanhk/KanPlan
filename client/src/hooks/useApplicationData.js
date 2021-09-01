import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    tasks: {},
    projects: {},
    users: {}
  });
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

  const addTask = async (newTask) => {
    const taskID = await axios
      .post(`http://localhost:8001/api/tasks/`, newTask)
      .then((res) => {
        return res.data.task_id;
      })
      .catch((error) => console.log(error));

    const tasks = {
      ...state.tasks,
      [taskID]: { ...newTask, id: taskID }
    };

    setState((prev) => ({ ...prev, tasks: tasks }));
    return { ...state, tasks: tasks };
  };

  const updateTask = async (taskState) => {
    console.log(taskState);
    setState((prev) => ({ ...prev, tasks: { ...prev.tasks, [taskState.id]: { ...prev.tasks[taskState.id], status: taskState.status, status_id: taskState.status_id } } }));
    console.log(state);
    axios
      .put(`http://localhost:8001/api/tasks/${taskState.id}/status`, taskState)
      .then((res) => console.log('Status update success!'))
      .catch((error) => console.log(error));
  };

  return { state, loading, addTask, updateTask };
}
