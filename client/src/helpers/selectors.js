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

  if(taskIDs[0]) {
    return taskIDs.map(index => state.tasks[index]);
  }

  return [];
}

//Returns number of projects the user is managing
function getProjectsManagingForUser(state, userID) {
  const projectIDs = state.users[userID].user_projects;
  return projectIDs.filter(index => state.projects[index].manager_id === userID).length
}

//Returns obj containing the 4 task statuses (as keys) and the number of tasks under each status for the user
function getTaskStatuses(state, userID) {
  const taskIDs = state.users[userID].user_tasks;
  const taskStatuses = {};

  if (taskIDs[0]) {
    taskStatuses.toDo = taskIDs.filter(index => state.tasks[index].status_id === 1).length
    taskStatuses.late = taskIDs.filter(index => state.tasks[index].status_id === 2).length 
    taskStatuses.inProgress = taskIDs.filter(index => state.tasks[index].status_id === 3).length 
    taskStatuses.done = taskIDs.filter(index => state.tasks[index].status_id === 4).length 
  }

  return taskStatuses;
}

function getUsersForProject(state, projectID) {
  const userIDs = state.projects[projectID].team_members;
  const projectUsers = {}

  if (userIDs[0]) {
    userIDs.forEach(index => {
      projectUsers[index] = state.users[index]
    })
  }

  return projectUsers;
}


// TEST DATA
// const projects = {
//   1: {
//     id: 1,
//     proj_name: "KanPlan",
//     manager_id: 1,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "Project management(not boring!)",
//     manager_name: "TJ Jung",
//     team_members: [1, 2, 3, 45],
//     project_tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
//   },
//   2: {
//     id: 2,
//     proj_name: "onlyFriends",
//     manager_id: 4,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "A tinder-style app to meet new friends with similar interests in your area",
//     manager_name: "Kleir Miranda",
//     team_members: [4, 5, 6, 45],
//     project_tasks: [12, 13, 14, 15],
//   },
//   3: {
//     id: 3,
//     proj_name: "Dev Community",
//     manager_id: 7,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "A social media platform for developers to interact with each other across the globe.",
//     manager_name: "Maggie Zhao",
//     team_members: [7, 8],
//     project_tasks: [16, 17, 18, 19],
//   },
//   4: {
//     id: 4,
//     proj_name: "Fete",
//     manager_id: 9,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "TBD",
//     manager_name: "Sarah Avery",
//     team_members: [9, 10],
//     project_tasks: [null],
//   },
//   5: {
//     id: 5,
//     proj_name: "Roshanak and Mohammads Project",
//     manager_id: 11,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "TBD",
//     manager_name: "Roshanak Akbarifar",
//     team_members: [11, 12],
//     project_tasks: [null],
//   },
//   6: {
//     id: 6,
//     proj_name: "David, Jamie and Mohameds Project",
//     manager_id: 13,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "TBD",
//     manager_name: "David O",
//     team_members: [13, 14, 15],
//     project_tasks: [null],
//   },
//   7: {
//     id: 7,
//     proj_name: "NoshFeast",
//     manager_id: 16,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "An app focused on takeout orders; Users can order from and pick up at the restaurants.",
//     manager_name: "Cathy Li",
//     team_members: [16, 17, 18],
//     project_tasks: [null],
//   },
//   8: {
//     id: 8,
//     proj_name: "Kathy and Emekas Project",
//     manager_id: 19,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "TBD",
//     manager_name: "Kathy Tam",
//     team_members: [19, 20],
//     project_tasks: [null],
//   },
//   9: {
//     id: 9,
//     proj_name: "Mona and Saraths Project",
//     manager_id: 21,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "TBD",
//     manager_name: "Mona Waseem",
//     team_members: [21, 22],
//     project_tasks: [null],
//   },
//   10: {
//     id: 10,
//     proj_name: "Farid and Camerons Project",
//     manager_id: 23,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "TBD",
//     manager_name: "Farid Asadpour",
//     team_members: [23, 24],
//     project_tasks: [null],
//   },
//   11: {
//     id: 11,
//     proj_name: "SNIFFLES",
//     manager_id: 25,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "An app to discover other dog owners within your area sharing similar features to dating apps.",
//     manager_name: "Anthony Chan",
//     team_members: [25, 26, 27],
//     project_tasks: [null],
//   },
//   12: {
//     id: 12,
//     proj_name: "RegexViz",
//     manager_id: 28,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description:
//       "A regular expression visualizer with syntax higlighting,step by step graph mode, and contextual information on the rules and syntax.",
//     manager_name: "Alex Mozgovoy",
//     team_members: [28, 29],
//     project_tasks: [null],
//   },
//   13: {
//     id: 13,
//     proj_name: "Lotify",
//     manager_id: 30,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "A location-based to-do list - app pops up a reminder when you are near the location.",
//     manager_name: "Janice Han",
//     team_members: [30, 31, 32],
//     project_tasks: [null],
//   },
//   14: {
//     id: 14,
//     proj_name: "findShelter",
//     manager_id: 33,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "A shelter management software - serve the homeless ",
//     manager_name: "Shaun Purslow",
//     team_members: [33, 34, 35],
//     project_tasks: [null],
//   },
//   15: {
//     id: 15,
//     proj_name: "hotelCalifornia",
//     manager_id: 36,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "Allows conveners post last minute requests or chat real time with the hotel crue",
//     manager_name: "Iuliia Sutygina",
//     team_members: [36, 37, 38],
//     project_tasks: [null],
//   },
//   16: {
//     id: 16,
//     proj_name: "Super Secret awesome amazing project",
//     manager_id: 39,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "Address independant delivery amazingness (Skip but way better)",
//     manager_name: "Matt MacDonald",
//     team_members: [39, 40, 41],
//     project_tasks: [null],
//   },
//   17: {
//     id: 17,
//     proj_name: "gg",
//     manager_id: 42,
//     planned_start: "2021-08-30T01:36:10.309Z",
//     planned_end: "2021-08-30T01:36:10.309Z",
//     proj_description: "social platform for reviewing and recommending video games",
//     manager_name: "Sylas Serne",
//     team_members: [42, 43, 44],
//     project_tasks: [null],
//   },
// };

// const tasks = {
//   1: {
//     id: 1,
//     title: "API Routes",
//     task_description: "Set up API Routes",
//     priority_id: 3,
//     status_id: 1,
//     project_id: 1,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "KanPlan",
//     priority_name: "High",
//     status: "To-Do",
//     task_users: [2],
//   },
//   2: {
//     id: 2,
//     title: "React Components",
//     task_description: "Build react components",
//     priority_id: 2,
//     status_id: 1,
//     project_id: 1,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "KanPlan",
//     priority_name: "Low",
//     status: "To-Do",
//     task_users: [1, 2, 3],
//   },
//   3: {
//     id: 3,
//     title: "Kanban DnD",
//     task_description: "Build Kanban containers and drag and drop",
//     priority_id: 2,
//     status_id: 1,
//     project_id: 1,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "KanPlan",
//     priority_name: "Low",
//     status: "To-Do",
//     task_users: [1],
//   },
//   4: {
//     id: 4,
//     title: "Relax",
//     task_description: "Relax a bit",
//     priority_id: 1,
//     status_id: 2,
//     project_id: 1,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "KanPlan",
//     priority_name: "None",
//     status: "Late",
//     task_users: [1, 2, 3],
//   },
//   5: {
//     id: 5,
//     title: "Seeds",
//     task_description: "Making api seeds",
//     priority_id: 3,
//     status_id: 3,
//     project_id: 1,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "KanPlan",
//     priority_name: "High",
//     status: "In Progress",
//     task_users: [1, 2],
//   },
//   6: {
//     id: 6,
//     title: "Gantt Research",
//     task_description: "Find a good library to use for the gantt chart",
//     priority_id: 2,
//     status_id: 3,
//     project_id: 1,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "KanPlan",
//     priority_name: "Low",
//     status: "In Progress",
//     task_users: [1, 2],
//   },
//   7: {
//     id: 7,
//     title: "React Component - Storybook Testing",
//     task_description: "Test components in storybook",
//     priority_id: 1,
//     status_id: 3,
//     project_id: 1,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "KanPlan",
//     priority_name: "None",
//     status: "In Progress",
//     task_users: [3],
//   },
//   8: {
//     id: 8,
//     title: "Build out back-end",
//     task_description: "Make sure api, DB and server are all working okay",
//     priority_id: 3,
//     status_id: 3,
//     project_id: 1,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "KanPlan",
//     priority_name: "High",
//     status: "In Progress",
//     task_users: [1, 2],
//   },
//   9: {
//     id: 9,
//     title: "ERD",
//     task_description: "Plan data relations with team",
//     priority_id: 2,
//     status_id: 4,
//     project_id: 1,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "KanPlan",
//     priority_name: "Low",
//     status: "Done",
//     task_users: [1, 2, 3],
//   },
//   10: {
//     id: 10,
//     title: "Wireframes",
//     task_description: "Create wireframes for visual reference",
//     priority_id: 3,
//     status_id: 4,
//     project_id: 1,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "KanPlan",
//     priority_name: "High",
//     status: "Done",
//     task_users: [3],
//   },
//   11: {
//     id: 11,
//     title: "User Stories",
//     task_description: "Create user stories to develop ERD and Wireframes",
//     priority_id: 1,
//     status_id: 4,
//     project_id: 1,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "KanPlan",
//     priority_name: "None",
//     status: "Done",
//     task_users: [1, 2, 3],
//   },
//   12: {
//     id: 12,
//     title: "Learn react-native",
//     task_description: "Mobile stuff is fun",
//     priority_id: 3,
//     status_id: 1,
//     project_id: 2,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "onlyFriends",
//     priority_name: "High",
//     status: "To-Do",
//     task_users: [4, 5, 6],
//   },
//   13: {
//     id: 13,
//     title: "Make friends",
//     task_description: "That's why we're making this app!",
//     priority_id: 3,
//     status_id: 2,
//     project_id: 2,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "onlyFriends",
//     priority_name: "High",
//     status: "Late",
//     task_users: [4, 5, 6],
//   },
//   14: {
//     id: 14,
//     title: "Figure out the back-end",
//     task_description: "Server no bueno",
//     priority_id: 2,
//     status_id: 3,
//     project_id: 2,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "onlyFriends",
//     priority_name: "Low",
//     status: "In Progress",
//     task_users: [4, 5],
//   },
//   15: {
//     id: 15,
//     title: "Figure out a name!",
//     task_description: "onlyFrands",
//     priority_id: 1,
//     status_id: 4,
//     project_id: 2,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "onlyFriends",
//     priority_name: "None",
//     status: "Done",
//     task_users: [4, 5, 6],
//   },
//   16: {
//     id: 16,
//     title: "Build the DBs",
//     task_description: "Mobile stuff is fun",
//     priority_id: 3,
//     status_id: 1,
//     project_id: 3,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "Dev Community",
//     priority_name: "High",
//     status: "To-Do",
//     task_users: [7],
//   },
//   17: {
//     id: 17,
//     title: "Don't stress",
//     task_description: "The entire bootcamp has been stress",
//     priority_id: 3,
//     status_id: 2,
//     project_id: 3,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "Dev Community",
//     priority_name: "High",
//     status: "Late",
//     task_users: [8],
//   },
//   18: {
//     id: 18,
//     title: "Planning!",
//     task_description: "So many documents so little time.",
//     priority_id: 2,
//     status_id: 3,
//     project_id: 3,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "Dev Community",
//     priority_name: "Low",
//     status: "In Progress",
//     task_users: [7],
//   },
//   19: {
//     id: 19,
//     title: "Find teammates!",
//     task_description: "Eliza and Maggie gonna kill it!",
//     priority_id: 1,
//     status_id: 4,
//     project_id: 3,
//     plan_start: "2021-08-30T01:36:10.309Z",
//     plan_end: "2021-08-30T01:36:10.309Z",
//     proj_name: "Dev Community",
//     priority_name: "None",
//     status: "Done",
//     task_users: [8],
//   },
// };

// const users = {
//   1: {
//     id: 1,
//     user_name: "TJ Jung",
//     email: "thisis@email.com",
//     last_login: "2021-08-30T01:36:10.309Z",
//     user_tasks: [2, 3, 4, 5, 6, 8, 9, 11],
//     user_projects: [1],
//   },
//   2: {
//     id: 2,
//     user_name: "Afsanul Khan",
//     email: "1@1.com",
//     last_login: "2021-08-30T01:36:10.309Z",
//     user_tasks: [1, 2, 4, 5, 6, 8, 9, 11],
//     user_projects: [1],
//   },
//   3: {
//     id: 3,
//     user_name: "Veronica Leung",
//     email: "chicken@soup.com",
//     last_login: "2021-08-30T01:36:10.309Z",
//     user_tasks: [2, 4, 7, 9, 10, 11],
//     user_projects: [1],
//   },
//   4: {
//     id: 4,
//     user_name: "Kleir Miranda",
//     email: "kleir@example.com",
//     last_login: "2021-08-30T01:36:10.309Z",
//     user_tasks: [12, 13, 14, 15],
//     user_projects: [2],
//   },
//   5: {
//     id: 5,
//     user_name: "Mitch Aldrich",
//     email: "mitch@example.com",
//     last_login: "2021-08-30T01:36:10.309Z",
//     user_tasks: [12, 13, 14, 15],
//     user_projects: [2],
//   },
//   6: {
//     id: 6,
//     user_name: "Beatrice Kwan",
//     email: "beatrice@example.com",
//     last_login: "2021-08-30T01:36:10.309Z",
//     user_tasks: [12, 13, 15],
//     user_projects: [2],
//   },
//   7: {
//     id: 7,
//     user_name: "Maggie Zhao",
//     email: "maggie@example.com",
//     last_login: "2021-08-30T01:36:10.309Z",
//     user_tasks: [16, 18],
//     user_projects: [3],
//   },
//   8: {
//     id: 8,
//     user_name: "Eliza Wong",
//     email: "eliza@example.com",
//     last_login: "2021-08-30T01:36:10.309Z",
//     user_tasks: [17, 19],
//     user_projects: [3],
//   },
//   9: {
//     id: 9,
//     user_name: "Sarah Avery",
//     email: "sarah@example.com",
//     last_login: "2021-08-30T01:36:10.309Z",
//     user_tasks: [null],
//     user_projects: [4],
//   },
//   45: {
//     id: 45,
//     user_name: "Multi User",
//     email: "multi@example.com",
//     last_login: "2021-08-30T01:36:10.309Z",
//     user_tasks: [null],
//     user_projects: [1, 2],
//   },
// };

// const state = {
//   projects,
//   tasks,
//   users,
// };

// console.log("-----------getTasksForProject-----------");
// console.log(getTasksForProject(state, 1));

// console.log("\n-----------getProjectsForUser-----------");
// console.log("1 Project:", getProjectsForUser(state, 1));
// console.log("Multiple Projects", getProjectsForUser(state, 45));

// console.log("-----------getTasksForUser-----------");
// console.log(getTasksForUser(state, 45));

// console.log("-----------getProjectsManagingForUser-----------");
// console.log(getProjectsManagingForUser(state, 1))

// console.log("-----------getTaskStatuses-----------");
// console.log(getTaskStatuses(state, 45))

// console.log("-----------getUsersForProject-----------");
// console.log(getUsersForProject(state, 1))

export {  
  getTasksForProject, 
  getProjectsForUser, 
  getTasksForUser, 
  getProjectsManagingForUser, 
  getTaskStatuses,
  getUsersForProject
};
