import Gantt from "../components/Gantt";

const projects = [
  {
    id: 1,
    proj_name: "KanPlan",
    manager_id: 1,
    planned_start: "2021-08-29T18:08:57.766Z",
    planned_end: "2021-08-29T18:08:57.766Z",
    proj_description: "Project management(not boring!)",
    manager_name: "TJ Jung",
    team_members: [1, 2, 3, 45],
    project_tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  {
    id: 2,
    proj_name: "onlyFriends",
    manager_id: 4,
    planned_start: "2021-08-29T18:08:57.766Z",
    planned_end: "2021-08-29T18:08:57.766Z",
    proj_description:
      "A tinder-style app to meet new friends with similar interests in your area",
    manager_name: "Kleir Miranda",
    team_members: [4, 5, 6, 45],
    project_tasks: [12, 13, 14, 15],
  },
  {
    id: 3,
    proj_name: "Dev Community",
    manager_id: 7,
    planned_start: "2021-08-29T18:08:57.766Z",
    planned_end: "2021-08-29T18:08:57.766Z",
    proj_description:
      "A social media platform for developers to interact with each other across the globe.",
    manager_name: "Maggie Zhao",
    team_members: [7, 8],
    project_tasks: [16, 17, 18, 19],
  },
  {
    id: 4,
    proj_name: "Fete",
    manager_id: 9,
    planned_start: "2021-08-29T18:08:57.766Z",
    planned_end: "2021-08-29T18:08:57.766Z",
    proj_description: "TBD",
    manager_name: "Sarah Avery",
    team_members: [9, 10],
    project_tasks: [null],
  },
];

const tasks = [
  {
    id: 1,
    title: "API Routes",
    task_description: "Set up API Routes",
    priority_id: 3,
    status_id: 1,
    project_id: 1,
    plan_start: "2021-08-26T18:08:57.766Z",
    plan_end: "2021-08-27T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "High",
    status: "To-Do",
    task_users: [2],
  },
  {
    id: 2,
    title: "React Components",
    task_description: "Build react components",
    priority_id: 2,
    status_id: 1,
    project_id: 1,
    plan_start: "2021-08-29T18:08:57.766Z",
    plan_end: "2021-09-06T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "Low",
    status: "To-Do",
    task_users: [1, 2, 3],
  },
  {
    id: 3,
    title: "Kanban DnD",
    task_description: "Build Kanban containers and drag and drop",
    priority_id: 2,
    status_id: 1,
    project_id: 1,
    plan_start: "2021-08-29T18:08:57.766Z",
    plan_end: "2021-09-03T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "Low",
    status: "To-Do",
    task_users: [1],
  },
  {
    id: 4,
    title: "Future task",
    task_description: "Build Kanban containers and drag and drop",
    priority_id: 2,
    status_id: 1,
    project_id: 1,
    plan_start: "2022-12-29T18:08:57.766Z",
    plan_end: "2022-12-31T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "Low",
    status: "To-Do",
    task_users: [1],
  },
];

const state = {
  projects,
  tasks,
};

const ProjectGantt = () => {
  return (
    <div>
      <h1>This will show the project Gantt.</h1>
      <section className="ganttContainer" style={{ marginLeft: "140px" }}>
        <Gantt projectTasks={state.tasks} />
      </section>
    </div>
  );
};

export default ProjectGantt;
