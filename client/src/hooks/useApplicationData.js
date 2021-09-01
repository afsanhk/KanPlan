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
      console.log(`Inside deleteTask task-id:${id}, projectID: ${projectID}, userID: ${userID}`);
      // Create state copy
      const stateCopy = JSON.parse(JSON.stringify(state));

      console.log("State before manipulation", state);
      console.log("Copy of state before manipulation", stateCopy);
      // Only manipulate stateCopy
      // Remove task object from stateCopy.tasks
      delete stateCopy.tasks[id];
      // Remove task from project_tasks array --> Looks for the task ID inside project_tasks, removes it.
      const index = stateCopy.projects[projectID].project_tasks.indexOf(id);
      if (index > -1) {
        stateCopy.projects[projectID].project_tasks.splice(index, 1);
      }
      // Remove

      console.log("State Project Tasks List", state.projects[projectID].project_tasks);
      console.log("State Copy Project Tasks List", stateCopy.projects[projectID].project_tasks);
      // setState({
      //   ...state,
      //   tasks,
      // });
    });
  }

  return { state, loading, addTask, updateTask, deleteTask };
}
