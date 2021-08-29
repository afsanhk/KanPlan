import Gantt from "../components/Gantt";

const projectTasks = [
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

const ProjectGantt = () => {
  return (
    <div>
      <h1>This will show the project Gantt.</h1>
      <section className="ganttContainer" style={{ marginLeft: "140px" }}>
        <Gantt projectTasks={projectTasks} />
      </section>
    </div>
  );
};

export default ProjectGantt;
