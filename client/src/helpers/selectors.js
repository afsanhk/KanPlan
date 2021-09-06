// Returns an array of task IDs for the given project
function getTasksForProject(state, projectID) {
  return state.projects[projectID].project_tasks;
}

// Returns an array of project IDs for the given user
function getProjectsForUser(state, userID) {
  if (state.users[userID].user_projects[0]) {
    return state.users[userID].user_projects;
  }

  return [];
}

//Returns an array (of objects) of tasks for the given user
function getTasksForUser(state, userID) {
  const taskIDs = state.users[userID].user_tasks;

  if (taskIDs[0]) {
    return taskIDs.map((index) => state.tasks[index]);
  }

  return [];
}

//Returns number of projects the user is managing
function getProjectsManagingForUser(state, userID) {
  const projectIDs = state.users[userID].user_projects;
  return projectIDs.filter((index) => state.projects[index].manager_id === userID).length;
}

//Returns obj containing the 4 task statuses (as keys) and the number of tasks under each status for the user
function getTaskStatuses(state, userID) {
  const taskIDs = state.users[userID].user_tasks;
  const taskStatuses = {};

  if (taskIDs[0]) {
    taskStatuses.toDo = taskIDs.filter((index) => state.tasks[index].status_id === 1).length;
    taskStatuses.late = taskIDs.filter((index) => state.tasks[index].status_id === 2).length;
    taskStatuses.inProgress = taskIDs.filter((index) => state.tasks[index].status_id === 3).length;
    taskStatuses.done = taskIDs.filter((index) => state.tasks[index].status_id === 4).length;
  }

  return taskStatuses;
}

function getUsersForProject(state, projectID) {
  const userIDs = state.projects[projectID].team_members;
  const projectUsers = {};

  if (userIDs[0]) {
    userIDs.forEach((index) => {
      projectUsers[index] = state.users[index];
    });
  }

  return projectUsers;
}

//Returns obj containing total, completed and incomplete tasks of a project
function getProjectStatus(state, projectID) {
  const taskIDs = state.projects[projectID].project_tasks.filter((el) => el);

  if (taskIDs[0]) {
    const completed = taskIDs.filter((task) => state.tasks[task].status === "Done").length;

    const projectStatus = {
      totalTasks: taskIDs.length,
      completedTasks: completed,
      incompleteTasks: taskIDs.length - completed,
    };

    return projectStatus;
  }

  return null; //not sure what to return back here for cases where there are no tasks for a project
}

export {
  getTasksForProject,
  getProjectsForUser,
  getTasksForUser,
  getProjectsManagingForUser,
  getTaskStatuses,
  getUsersForProject,
  getProjectStatus,
};
