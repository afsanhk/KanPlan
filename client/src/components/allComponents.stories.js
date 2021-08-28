import React from "react";

import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import TaskListItem from "./TaskListItem";
import TaskList from  "./TaskList";
import HomepageMyWork from  "./HomepageMyWork";
import HomepageImportantUpdates from  "./HomepageImportantUpdates";


const userTasks = [
  {
    id: 1,
    title: 'Test1'
  },
  {
    id: 2,
    title: 'Test2'
  }
] 



storiesOf("TaskListItem", module)
  .add("Initial", () => <TaskListItem title='Test' />)

storiesOf("TaskList", module)
  .add("Initial", () => <TaskList tasks={userTasks} />)

storiesOf("HomepageMyWork", module)
  .add("Initial", () => <HomepageMyWork tasks={userTasks} />)
  
storiesOf("HomepageImportantUpdates", module)
.add("Initial", () => <HomepageImportantUpdates />)