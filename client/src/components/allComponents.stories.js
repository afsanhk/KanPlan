import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";

import TaskListItem from "./TaskListItem";
import TaskList from "./TaskList";
import HomepageMyWork from "./HomepageMyWork";
import HomepageImportantUpdates from "./HomepageImportantUpdates";

import DeleteTaskForm from "./DeleteTaskForm";
import EditTaskForm from "./EditTaskForm";
import AddTaskForm from "./AddTaskForm";
import TeamMemberName from "./TeamMemberName";
import TeamMember from "./TeamMember";

import ProjectNameDescription from "./ProjectNameDescription";

import HomepageMyProjects from "./HomepageMyProjects";
import ConfirmButton from "./ConfirmButton";

import ProjectKanban from "../pages/ProjectKanban";

import HomepageChartA from "./HomepageChartA";
import HomepageChartB from "./HomepageChartB";
import HomepageCharts from "./HomepageCharts";

import Gantt from "./Gantt";

import ProjectOverviewTable from "./ProjectOverviewTable";

import LinkIconContainer from "./LinkIconContainer";
import ProjectListItem from "./ProjectListItem";
import ProjectList from "./ProjectList";
import ProjectUsers from "./ProjectUsers";

import AddProjectButton from "./AddProjectButton";
import AddProjectForm from "./AddProjectForm";
import CheckboxDropdown from "./CheckboxDropdown";

// TEST DATA
const projects = {
  1: {
    id: 1,
    proj_name: "KanPlan",
    manager_id: 1,
    planned_start: "2021-08-30T01:36:10.309Z",
    planned_end: "2021-08-30T01:36:10.309Z",
    proj_description: "Project management(not boring!)",
    manager_name: "TJ Jung",
    team_members: [1, 2, 3, 45],
    project_tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  2: {
    id: 2,
    proj_name: "onlyFriends",
    manager_id: 4,
    planned_start: "2021-08-30T01:36:10.309Z",
    planned_end: "2021-08-30T01:36:10.309Z",
    proj_description: "A tinder-style app to meet new friends with similar interests in your area",
    manager_name: "Kleir Miranda",
    team_members: [4, 5, 6, 45],
    project_tasks: [12, 13, 14, 15],
  },
  3: {
    id: 3,
    proj_name: "Dev Community",
    manager_id: 7,
    planned_start: "2021-08-30T01:36:10.309Z",
    planned_end: "2021-08-30T01:36:10.309Z",
    proj_description: "A social media platform for developers to interact with each other across the globe.",
    manager_name: "Maggie Zhao",
    team_members: [7, 8],
    project_tasks: [16, 17, 18, 19],
  },
};

const tasks = {
  1: {
    id: 1,
    title: "API Routes",
    task_description: "Set up API Routes",
    priority_id: 3,
    status_id: 1,
    project_id: 1,
    plan_start: "2021-08-30T01:36:10.309Z",
    plan_end: "2021-08-30T01:36:10.309Z",
    proj_name: "KanPlan",
    priority_name: "High",
    status: "To-Do",
    task_users: [2],
  },
  2: {
    id: 2,
    title: "React Components",
    task_description: "Build react components",
    priority_id: 2,
    status_id: 1,
    project_id: 1,
    plan_start: "2021-08-30T01:36:10.309Z",
    plan_end: "2021-08-30T01:36:10.309Z",
    proj_name: "KanPlan",
    priority_name: "Low",
    status: "To-Do",
    task_users: [1, 2, 3],
  },
  3: {
    id: 3,
    title: "Kanban DnD",
    task_description: "Build Kanban containers and drag and drop",
    priority_id: 2,
    status_id: 1,
    project_id: 1,
    plan_start: "2021-08-30T01:36:10.309Z",
    plan_end: "2021-08-30T01:36:10.309Z",
    proj_name: "KanPlan",
    priority_name: "Low",
    status: "To-Do",
    task_users: [1],
  },
};

const users = {
  1: {
    id: 1,
    user_name: "TJ Jung",
    email: "thisis@email.com",
    last_login: "2021-08-30T01:36:10.309Z",
    user_tasks: [2, 3, 4, 5, 6, 8, 9, 11],
    user_projects: [1],
  },
  2: {
    id: 2,
    user_name: "Afsanul Khan",
    email: "1@1.com",
    last_login: "2021-08-30T01:36:10.309Z",
    user_tasks: [1, 2, 4, 5, 6, 8, 9, 11],
    user_projects: [1],
  },
  3: {
    id: 3,
    user_name: "Veronica Leung",
    email: "chicken@soup.com",
    last_login: "2021-08-30T01:36:10.309Z",
    user_tasks: [2, 4, 7, 9, 10, 11],
    user_projects: [1],
  },
  4: {
    id: 4,
    user_name: "Kleir Miranda",
    email: "kleir@example.com",
    last_login: "2021-08-30T01:36:10.309Z",
    user_tasks: [12, 13, 14, 15],
    user_projects: [2],
  },
  5: {
    id: 5,
    user_name: "Mitch Aldrich",
    email: "mitch@example.com",
    last_login: "2021-08-30T01:36:10.309Z",
    user_tasks: [12, 13, 14, 15],
    user_projects: [2],
  },
  6: {
    id: 6,
    user_name: "Beatrice Kwan",
    email: "beatrice@example.com",
    last_login: "2021-08-30T01:36:10.309Z",
    user_tasks: [12, 13, 15],
    user_projects: [2],
  },
  7: {
    id: 7,
    user_name: "Maggie Zhao",
    email: "maggie@example.com",
    last_login: "2021-08-30T01:36:10.309Z",
    user_tasks: [16, 18],
    user_projects: [3],
  },
  8: {
    id: 8,
    user_name: "Eliza Wong",
    email: "eliza@example.com",
    last_login: "2021-08-30T01:36:10.309Z",
    user_tasks: [17, 19],
    user_projects: [3],
  },
  9: {
    id: 9,
    user_name: "Sarah Avery",
    email: "sarah@example.com",
    last_login: "2021-08-30T01:36:10.309Z",
    user_tasks: [null],
    user_projects: [4],
  },
  45: {
    id: 45,
    user_name: "Multi User",
    email: "multi@example.com",
    last_login: "2021-08-30T01:36:10.309Z",
    user_tasks: [null],
    user_projects: [1, 2],
  },
};

const projectsArray = Object.keys(projects).map((key) => projects[key]);
const tasksArray = Object.keys(tasks).map((key) => tasks[key]);
const usersArray = Object.keys(users).map((key) => users[key]);

const state = {
  projects,
  tasks,
  users,
};

const userTasks = [
  {
    id: 1,
    title: "Test1",
    task_description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta corporis voluptatem assumenda labore, sequi eos odio autem voluptates, officia incidunt ipsum tenetur aperiam! Aliquid accusantium quod voluptatum corrupti sint quisquam?",
    task_users: [1, 2, 3],
  },
  {
    id: 2,
    title: "Test2",
    task_description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta corporis voluptatem assumenda labore, sequi eos odio autem voluptates, officia incidunt ipsum tenetur aperiam! Aliquid accusantium quod voluptatum corrupti sint quisquam?",
    task_users: [1, 2, 3, 4, 5, 6, 7, 8, 9, 45],
  },
];

const userProjects = [
  {
    id: 1,
    proj_name: "KanPlan",
    proj_description: "Project management(not boring!)",
    team_members: [1, 2, 3],
  },
  {
    id: 2,
    proj_name: "onlyFriends",
    proj_description: "A tinder-style app to meet new friends with similar interests in your area",
    team_members: [45, 9],
  },
  {
    id: 3,
    proj_name: "Dev Community",
    proj_description: "A social media platform for developers to interact with each other across the globe.",
    team_members: [1, 2, 3, 4, 5, 6, 7, 8, 9, 45],
  },
];

const chartData = {
  late: 1,
  toDo: 2,
  inProgress: 3,
  done: 4,
};

const lorem =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta corporis voluptatem assumenda labore, sequi eos odio autem voluptates, officia incidunt ipsum tenetur aperiam! Aliquid accusantium quod voluptatum corrupti sint quisquam";

// For Gantt Layout
const projectTasks = [
  {
    id: 1,
    title: "API Routes",
    task_description: "Set up API Routes",
    priority_id: 3,
    status_id: 4,
    project_id: 1,
    plan_start: "2021-08-26T18:08:57.766Z",
    plan_end: "2021-08-27T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "High",
    status: "Done",
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
    title: "Relax",
    task_description: "Relax a bit",
    priority_id: 1,
    status_id: 2,
    project_id: 1,
    plan_start: "2021-09-01T18:08:57.766Z",
    plan_end: "2021-09-03T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "None",
    status: "Late",
    task_users: [1, 2, 3],
  },
  {
    id: 5,
    title: "Seeds",
    task_description: "Making api seeds",
    priority_id: 3,
    status_id: 3,
    project_id: 1,
    plan_start: "2021-09-01T18:08:57.766Z",
    plan_end: "2021-09-02T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "High",
    status: "In Progress",
    task_users: [1, 2],
  },
];

// Stories
storiesOf("TaskListItem", module).add("Initial", () => <TaskListItem task={state.tasks[1]} />);

storiesOf("TaskList", module).add("Initial", () => <TaskList tasks={userTasks} />);

storiesOf("ConfirmButton", module)
  .add("Save", () => <ConfirmButton saving />)
  .add("Delete", () => <ConfirmButton deleting />)
  .add("Cancel", () => <ConfirmButton cancelling />);

storiesOf("HomepageMyWork", module).add("Initial", () => <HomepageMyWork tasks={userTasks} />);

storiesOf("TeamMember", module)
  .add("Add", () => <TeamMember add border name="User" />)
  .add("Remove", () => <TeamMember remove border name="User" />)
  .add("Just name", () => (
    <>
      <TeamMemberName name="User" />
      <TeamMemberName name="User2" />
    </>
  ))
  .add("No name", () => <TeamMemberName />);

storiesOf("HomepageImportantUpdates", module).add("Initial", () => <HomepageImportantUpdates />);

storiesOf("EditTaskForm", module).add("Initial", () => (
  <EditTaskForm tasks={tasks["1"]} projects={projectsArray} users={users} />
));
storiesOf("AddTaskForm", module).add("Initial", () => (
  <AddTaskForm proj_name={projects["1"].proj_name} team_members={projects["1"].team_members} users={users} />
));
storiesOf("DeleteTaskForm", module).add("Initial", () => <DeleteTaskForm />);
storiesOf("ProjectUsers", module).add("Initial", () => <ProjectUsers users={users} project={projectsArray[0]} />);

storiesOf("ProjectNameDescription", module)
  .add("Homepage (3 users)", () => (
    <ProjectNameDescription
      proj_name="Project Name"
      proj_description={lorem}
      team_members={userProjects[0].team_members}
      state={state}
    />
  ))
  .add("Homepage (10 users)", () => (
    <ProjectNameDescription
      proj_name="Project Name"
      proj_description={lorem}
      team_members={userProjects[2].team_members}
      state={state}
    />
  ));

storiesOf("HomepageMyProjects", module).add("Intial", () => (
  <HomepageMyProjects projects={userProjects} state={state} />
));

// storiesOf('Kanban', module).add('Project Kanban', () => <ProjectKanban />);

storiesOf("HomepageCharts", module).add("Chart A", () => (
  <HomepageChartA chartInformation={"8"} chartTitle="Projects Managing" chartColor="#0099ff" />
));
storiesOf("HomepageCharts", module).add("Chart B", () => <HomepageChartB chartInformation={chartData} />);
storiesOf("HomepageCharts", module).add("Charts", () => (
  <HomepageCharts projectsManaging={0} projectsWorkingOn={10} tasks={userTasks} taskStatuses={chartData} />
));

storiesOf("Gantt", module)
  .add("Basic", () => <Gantt projectTasks={projectTasks} />)
  .add("No Data", () => <Gantt projectTasks={[null]} />);

storiesOf("Project Overview Table", module)
  .add("Basic", () => <ProjectOverviewTable projectTasks={projectTasks} />)
  .add("No Data", () => <ProjectOverviewTable projectTasks={[null]} />);

storiesOf("Add Projects", module)
  .add("Add Project Form", () => <AddProjectForm state={state} userID={1} />)
  .add("Button & Drawer", () => <AddProjectButton state={state} userID={1} />)
  .add("Checkbox Dropdown", () => <CheckboxDropdown users={state.users} />);
