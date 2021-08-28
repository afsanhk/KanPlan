import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from "@storybook/addon-actions";

import TaskListItem from './TaskListItem';
import TaskList from './TaskList';
import HomepageMyWork from './HomepageMyWork';
import HomepageImportantUpdates from './HomepageImportantUpdates';

import EditTaskForm from './EditTaskForm';
import TeamMemberName from './TeamMemberName';
import TeamMember from './TeamMember';

import ProjectNameDescription from './ProjectNameDescription'

import HomepageMyProjects from './HomepageMyProjects';


const userTasks = [
  {
    id: 1,
    title: 'Test1'
  },
  {
    id: 2,
    title: 'Test2'
  }
];

const userProjects = [
  {
    id: 1,
    proj_name: "KanPlan",
    proj_description: "Project management(not boring!)",
    proj_users: [
      {name: 'Afsan'}, 
      {name: 'TJ'}, 
      {name: 'Veronica'}
    ]
  },
  {
    id: 2,
    proj_name: "onlyFriends",
    proj_description: "A tinder-style app to meet new friends with similar interests in your area",
    proj_users: [
      {name: 'A'}, 
      {name: 'B'}, 
      {name: 'C'}
    ]
  },
  {
    id: 3,
    proj_name: "Dev Community",
    proj_description: "A social media platform for developers to interact with each other across the globe.",
    proj_users: [
      {name: 'A'}, 
      {name: 'B'}, 
      {name: 'C'}, 
      {name: 'D'}, 
      {name: 'E'}, 
      {name: 'F'}, 
      {name: 'G'}, 
      {name: 'H'}, 
      {name: 'I'}, 
      {name: 'J'}
    ]
  },
]

const lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta corporis voluptatem assumenda labore, sequi eos odio autem voluptates, officia incidunt ipsum tenetur aperiam! Aliquid accusantium quod voluptatum corrupti sint quisquam'

storiesOf('TaskListItem', module).add('Initial', () => <TaskListItem title="Test" />);

storiesOf('TaskList', module).add('Initial', () => <TaskList tasks={userTasks} />);

storiesOf('HomepageMyWork', module).add('Initial', () => <HomepageMyWork tasks={userTasks} />);

storiesOf('TeamMember', module).add('Add', () => <TeamMember add border name="User" />);
storiesOf('TeamMember', module).add('Remove', () => <TeamMember remove border name="User" />);
storiesOf('TeamMember', module).add('Just name', () => 
  <>
    <TeamMemberName name="User" />
    <TeamMemberName name="User2" />
  </>
);
storiesOf('TeamMember', module).add('No name', () => <TeamMemberName />)

storiesOf('HomepageImportantUpdates', module).add('Initial', () => <HomepageImportantUpdates />);

storiesOf('EditTaskForm', module).add('Initial', () => <EditTaskForm />);

storiesOf('ProjectNameDescription', module).add('Homepage (3 users)', () => 
  <ProjectNameDescription 
    proj_name='Project Name'
    proj_description={lorem}
    proj_users={userProjects[0].proj_users}
  />
);
storiesOf('ProjectNameDescription', module).add('Homepage (10 users)', () => 
  <ProjectNameDescription 
    proj_name='Project Name'
    proj_description={lorem}
    proj_users={userProjects[2].proj_users}
  />
);

storiesOf('HomepageMyProjects', module).add('Intial (10 users)', () => 
  <HomepageMyProjects 
    userProjects={userProjects}
  />
);