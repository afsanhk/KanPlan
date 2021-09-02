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

  const updateTaskStatus = (taskState, taskID) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    stateCopy.tasks[taskID].status = taskState.status;
    stateCopy.tasks[taskID].status_id = taskState.status_id;
    stateCopy.tasks[taskID].kanban_order = taskState.kanban_order;

    setState((prev) => ({ ...prev, tasks: { ...prev.tasks, [taskID]: stateCopy.tasks[taskID] } }));
    return axios.put(`http://localhost:8001/api/tasks/${taskState.id}/status`, { ...taskState, id: taskID }).catch((error) => console.log(error));
  };

  const editTask = (newTaskData, taskID) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    
    stateCopy.tasks[taskID].task_description = newTaskData.task_description;
    stateCopy.tasks[taskID].plan_start = newTaskData.plan_start;
    stateCopy.tasks[taskID].plan_end = newTaskData.plan_end;
    stateCopy.tasks[taskID].task_users = newTaskData.task_users
    
    if (newTaskData.priority_id) {
      stateCopy.tasks[taskID].priority_id = newTaskData.priority_id;
      stateCopy.tasks[taskID].priority_name = newTaskData.priority_name;
    }

    if (newTaskData.status_id) {
      stateCopy.tasks[taskID].status_id = newTaskData.status_id;
      stateCopy.tasks[taskID].status = newTaskData.status_name;
    }

    const newTaskFullData = stateCopy.tasks[taskID]
    console.log('newTaskFullData:', newTaskFullData)
    console.log('taskID:', taskID)

    //got through old task users, compare to new task users, go to that users/user_tasks, delete task id
    const oldArrayOfUsers = state.tasks[taskID].task_users;
    const newArrayOfUsers = newTaskFullData.task_users;

    const deletedUsers = oldArrayOfUsers.filter(task_user => !newArrayOfUsers.includes(task_user))
    
    deletedUsers.forEach(userID => {
      const taskIndex = stateCopy.users[userID].user_tasks.indexOf(taskID);
      stateCopy.users[userID].user_tasks.splice(taskIndex, 1);

      setState((prev) => ({
        ...prev,
        users: { ...prev.users, [userID]: stateCopy.users[userID]}
      }))
    })


    setState((prev) => ({ 
      ...prev, 
      tasks: { ...prev.tasks, [taskID]: stateCopy.tasks[taskID]},
    }));
    return axios.put(`http://localhost:8001/api/tasks/${taskID}`, {newTaskFullData}).catch((error) => console.log(error));
  }

  const getKanbanStatus = (projectID) => {
    return axios.get(`http://localhost:8001/api/kanban/project/${projectID}`).then((res) => {
      setKanbanStatus(res.data);
    });
  };

  function deleteTask(id, projectID, userID) {
    return axios.delete(`http://localhost:8001/api/tasks/${id}`).then(() => {
      // console.log(`Inside deleteTask task-id:${id}, projectID: ${projectID}, userID: ${userID}`);
      // Create state copy
      const stateCopy = JSON.parse(JSON.stringify(state));

      // console.log('State before manipulation', state);
      // console.log('Copy of state before manipulation', stateCopy);
      // Only manipulate stateCopy
      // Remove task object from stateCopy.tasks
      delete stateCopy.tasks[id];
      // Remove task from project_tasks array --> Looks for the task ID inside project_tasks, removes it.
      const deletedProjectTaskIndex = stateCopy.projects[projectID].project_tasks.indexOf(id);
      if (deletedProjectTaskIndex > -1) {
        stateCopy.projects[projectID].project_tasks.splice(deletedProjectTaskIndex, 1);
      }
      // console.log('State Project Tasks List', state.projects[projectID].project_tasks);
      // console.log('State Copy Project Tasks List', stateCopy.projects[projectID].project_tasks);
      // Remove task from user_tasks array --> Looks for the task ID inside user_tasks, removes it.
      // If the task is not assigned to the user, doesn't do anything.
      const deletedUserTaskIndex = stateCopy.users[userID].user_tasks.indexOf(id);
      if (deletedUserTaskIndex > -1) {
        stateCopy.users[userID].user_tasks.splice(deletedUserTaskIndex, 1);
      }
      // console.log('State User Tasks List', state.users[userID].user_tasks);
      // console.log('State Copy User Tasks List', stateCopy.users[userID].user_tasks);
      // Finally, set state.
      // console.log('State', state);
      // console.log('State Copy', stateCopy);
      setState((prev) => ({ ...prev, ...stateCopy }));
    });
  }

  //id is the project id
  function deleteProject(id) {
    return axios.delete(`http://localhost:8001/api/projects/${id}`).then(() => {

      const stateCopy = JSON.parse(JSON.stringify(state))

      //remove project from user[user_projects]
      const projectMembers = stateCopy.projects[id].team_members

      projectMembers.forEach((userID) => {
        const projectIndex = stateCopy.users[userID].user_projects.indexOf(id)
        stateCopy.users[userID].user_projects.splice(projectIndex, 1)
      })

      //remove tasks from project
      const projectTasks = stateCopy.projects[id].project_tasks

      projectTasks.forEach((taskID) => {
        delete stateCopy.tasks[taskID]
      })

      //remove tasks from users
      projectMembers.forEach((userID) => {
        projectTasks.forEach((taskID) => {
          const projectTaskUnderUserIndex = stateCopy.users[userID].user_tasks.indexOf(taskID)

          if (projectTaskUnderUserIndex > -1) {
            stateCopy.users[userID].user_tasks.splice(projectTaskUnderUserIndex, 1)
          }
        })
      })

      //remove project from stateCopy.projects
      delete stateCopy.projects[id]

      setState((prev) => ({ ...prev, ...stateCopy }));
    });
  }

  return { state, loading, addTask, updateTaskStatus, deleteTask, editTask, deleteProject, getKanbanStatus, kanbanStatus };
}
