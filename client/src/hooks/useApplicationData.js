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

  const updateTasks = (newTask) => {
    axios
      .post(`http://localhost:8001/api/tasks/`, newTask)
      .then(() => axios.get('http://localhost:8001/api/tasks').then((res) => setState((prev) => ({ ...prev, tasks: res.data }))))
      .catch((error) => console.log(error));

    return state;
  };

  function deleteTask (id) {
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

    })


  }

  return { state, loading, updateTasks, deleteTask };
}
