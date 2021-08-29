import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
// import { action } from '@storybook/addon-actions';

import TaskListItem from "./TaskListItem";
import TaskList from "./TaskList";
import HomepageMyWork from "./HomepageMyWork";
import HomepageImportantUpdates from "./HomepageImportantUpdates";

import EditTaskForm from "./EditTaskForm";
import TeamMemberName from "./TeamMemberName";
import TeamMember from "./TeamMember";

import ProjectNameDescription from "./ProjectNameDescription";

import HomepageMyProjects from "./HomepageMyProjects";
import ConfirmButton from "./ConfirmButton";

import NavBar from "./NavBar";

import KanbanBoard from "./KanbanBoard";

import HomepageChartA from "./HomepageChartA";
import HomepageChartB from "./HomepageChartB";
import HomepageCharts from "./HomepageCharts";

import Gantt from "./Gantt";

const userTasks = [
  {
    id: 1,
    title: "Test1",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta corporis voluptatem assumenda labore, sequi eos odio autem voluptates, officia incidunt ipsum tenetur aperiam! Aliquid accusantium quod voluptatum corrupti sint quisquam?",
  },
  {
    id: 2,
    title: "Test2",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta corporis voluptatem assumenda labore, sequi eos odio autem voluptates, officia incidunt ipsum tenetur aperiam! Aliquid accusantium quod voluptatum corrupti sint quisquam?",
  },
];

const userProjects = [
  {
    id: 1,
    proj_name: "KanPlan",
    proj_description: "Project management(not boring!)",
    proj_users: [{ name: "Afsan" }, { name: "TJ" }, { name: "Veronica" }],
  },
  {
    id: 2,
    proj_name: "onlyFriends",
    proj_description:
      "A tinder-style app to meet new friends with similar interests in your area",
    proj_users: [{ name: "A" }, { name: "B" }, { name: "C" }],
  },
  {
    id: 3,
    proj_name: "Dev Community",
    proj_description:
      "A social media platform for developers to interact with each other across the globe.",
    proj_users: [
      { name: "A" },
      { name: "B" },
      { name: "C" },
      { name: "D" },
      { name: "E" },
      { name: "F" },
      { name: "G" },
      { name: "H" },
      { name: "I" },
      { name: "J" },
    ],
  },
];

const chartData = [1, 2, 3, 4];

const taskStatus = [
  { name: "To-Do" },
  { name: "Late" },
  { name: "In Progress" },
  { name: "Done" },
];

const taskPriority = [{ name: "High" }, { name: "Low" }, { name: "None" }];

const lorem =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta corporis voluptatem assumenda labore, sequi eos odio autem voluptates, officia incidunt ipsum tenetur aperiam! Aliquid accusantium quod voluptatum corrupti sint quisquam";

// For Gantt Layout
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
storiesOf("TaskListItem", module).add("Initial", () => (
  <TaskListItem title="Test" />
));

storiesOf("TaskList", module).add("Initial", () => (
  <TaskList tasks={userTasks} />
));

storiesOf("ConfirmButton", module)
  .add("Save", () => <ConfirmButton saving />)
  .add("Delete", () => <ConfirmButton deleting />)
  .add("Cancel", () => <ConfirmButton cancelling />);

storiesOf("HomepageMyWork", module).add("Initial", () => (
  <HomepageMyWork tasks={userTasks} />
));

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

storiesOf("HomepageImportantUpdates", module).add("Initial", () => (
  <HomepageImportantUpdates />
));

storiesOf("EditTaskForm", module).add("Initial", () => (
  <EditTaskForm
    tasks={userTasks[0]}
    userProjects={userProjects}
    taskStatus={taskStatus}
    taskPriority={taskPriority}
  />
));

storiesOf("ProjectNameDescription", module)
  .add("Homepage (3 users)", () => (
    <ProjectNameDescription
      proj_name="Project Name"
      proj_description={lorem}
      proj_users={userProjects[0].proj_users}
    />
  ))
  .add("Homepage (10 users)", () => (
    <ProjectNameDescription
      proj_name="Project Name"
      proj_description={lorem}
      proj_users={userProjects[2].proj_users}
    />
  ));

storiesOf("HomepageMyProjects", module).add("Intial", () => (
  <HomepageMyProjects userProjects={userProjects} />
));

storiesOf("NavBar", module).add("Intial", () => <NavBar />);

storiesOf("Kanban", module)
  .add("Late", () => <KanbanBoard status={"Late"} tasks={userTasks} />)
  .add("To-Do", () => <KanbanBoard status={"To-Do"} tasks={userTasks} />)
  .add("In Progress", () => (
    <KanbanBoard status={"In Progress"} tasks={userTasks} />
  ))
  .add("Done", () => <KanbanBoard status={"Done"} tasks={userTasks} />);

storiesOf("HomepageCharts", module).add("Chart A", () => (
  <HomepageChartA
    chartInformation={"8"}
    chartTitle="Projects Managing"
    chartColor="#0099ff"
  />
));
storiesOf("HomepageCharts", module).add("Chart B", () => (
  <HomepageChartB chartInformation={chartData} />
));
storiesOf("HomepageCharts", module).add("Charts", () => <HomepageCharts />);

storiesOf("Gantt", module).add("Basic", () => (
  <Gantt projectTasks={projectTasks} />
));
