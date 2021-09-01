import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    tasks: {},
    projects: {},
    users: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/tasks"),
      axios.get("http://localhost:8001/api/projects"),
      axios.get("http://localhost:8001/api/users"),
    ]).then((all) => {
      //updates the state with all the information received from the axios get requests
      setState((prev) => ({
        ...prev,
        tasks: all[0].data,
        projects: all[1].data,
        users: all[2].data,
      }));
      setLoading(false);
    });
  }, []); //empty square brackets ensures that this useEffect is only ran once during page load

  // useEffect(() => {
  // }, [state]);

  const addTask = async (newTask) => {
    const taskID = await axios
      .post(`http://localhost:8001/api/tasks/`, newTask)
      .then((res) => {
        return res.data.task_id;
      })
      .catch((error) => console.log(error));

    const tasks = {
      ...state.tasks,
      [taskID]: { ...newTask, id: taskID },
    };

    setState((prev) => ({ ...prev, tasks: tasks }));
    console.log(state.tasks);
    // return { ...state, tasks: tasks };
  };

  const updateTask = (taskState) => {
    console.log(taskState);
    const task = {
      ...state.tasks[taskState.id],
      status: taskState.status,
      status_id: taskState.status_id,
    };

    const tasks = {
      ...state.tasks,
      [taskState.id]: task,
    };

    setState((prev) => ({ ...prev, tasks }));
    console.log(state.tasks[taskState.id]);

    return axios
      .put(`http://localhost:8001/api/tasks/${taskState.id}/status`, taskState)
      .then(() => {})
      .catch((error) => console.log(error));
  };

  function deleteTask(id, projectID, userID) {
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

  return { state, loading, addTask, updateTask, deleteTask };
}
