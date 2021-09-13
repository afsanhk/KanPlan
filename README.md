# KanPlan

KanPlan is a project management web app to make organizing your ideas easier!

## Pages

1. Home Page
2. Project Page
3. Project Overview Page
4. Gantt Page
5. Kanban Page

## Home Page

![homepage](https://github.com/afsanhk/KanPlan/blob/master/docs/homepage.png)

### Edit Task

![editTask](https://github.com/afsanhk/KanPlan/blob/master/docs/editTask.png)

### Delete Task

![deleteTask](https://github.com/afsanhk/KanPlan/blob/master/docs/deleteTask.png)

### Pomodoro

![pomodoro](https://github.com/afsanhk/KanPlan/blob/master/docs/pomodoro.gif)

## Project Page

![projectpage](https://github.com/afsanhk/KanPlan/blob/master/docs/projectPage.png)

### Add Project

![addproject](https://github.com/afsanhk/KanPlan/blob/master/docs/addProject.png)

### Delete Project

![deleteproject](https://github.com/afsanhk/KanPlan/blob/master/docs/deleteProject.png)

## Project Overview Page

![projectoverviewpage](https://github.com/afsanhk/KanPlan/blob/master/docs/projectOverviewPage.png)

### Add Task

![addTask](https://github.com/afsanhk/KanPlan/blob/master/docs/addTask.png)

### Edit Status

![editstatus](https://github.com/afsanhk/KanPlan/blob/master/docs/editStatus.gif)

### Edit Priority

![editpriority](https://github.com/afsanhk/KanPlan/blob/master/docs/editPriority.gif)

### Project Users

![projectUsers](https://github.com/afsanhk/KanPlan/blob/master/docs/projectUsers.png)

### Edit Project Users

![editUsers](https://github.com/afsanhk/KanPlan/blob/master/docs/editUsers.gif)

## Gantt Page

![ganttpage](https://github.com/afsanhk/KanPlan/blob/master/docs/ganttPage.png)

## Kanban Page

![kanbanpage](https://github.com/afsanhk/KanPlan/blob/master/docs/kanbanPage.png)

### Drag and Drop

![dnd](https://github.com/afsanhk/KanPlan/blob/master/docs/dnd.gif)

## Chat Room

![chatroom](https://github.com/afsanhk/KanPlan/blob/master/docs/chatroom.png)

### Chat

![addChat](https://github.com/afsanhk/KanPlan/blob/master/docs/websocketchat.gif?raw=true)

### User Profile Image Generator

![profileImage](https://github.com/afsanhk/KanPlan/blob/master/docs/webcamCapture.gif?raw=true)

# Contributors

- [Taejin (TJ) Jung](https://github.com/taejin5314)
- [Veronica Leung](https://github.com/tungtung233)
- [Afsanul H. Khan](https://github.com/afsanhk)

# Stack

- Built using React, Node, Express and PostgreSQL.
- React-beautiful-DND used for drag and drop on the Kanban page.
- Syncfusion gantt (used under free community license) for the Gantt Chart.
- Tensorflow-blazeface & react-webcam for profile picture change feature.
- Socket.io used for chat feature with websockets.
- Chart.js and react-chartjs-2 for charts.
- Material UI for pre-made components.
- Styled with Material UI overrides and CSS/SASS.

# Getting Started (/server)

## Setup API

Install dependencies with `npm install`

## Creating the DB

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`. This command **MUST** be run in a vagrant terminal, we used the PostgreSQL installation provided in the vagrant environment.

Create a database with the command `CREATE DATABASE kanplan_development;`.

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=kanplan_development
PGPASSWORD=development
PGPORT=5432
```

## Seeding

Run the development server with `npm start` in the Host environment.

- Make a `GET` request to `/api/debug/reset` with `curl http://localhost:8001/api/debug/reset`.
- Use the browser to navigate to `http://localhost:8001/api/debug/reset`.

## Run The Server

Running the server normally

```sh
npm start
```

## API

### Projects

`GET /api/projects`

Response

```json
{
  {
    "id": 1,
    "proj_name": "KanPlan",
    "manager_id": 1,
    "planned_start": "2021-09-11T02:56:02.261Z",
    "planned_end": "2021-09-11T02:56:02.261Z",
    "proj_description": "KanPlan is a project management web app to make organizing your ideas easier!",
    "manager_name": "TJ Jung",
    "team_members": [
      ...
    ],
    "project_tasks": [
      ...
    ]
  }
}
```

### Tasks

`GET /api/tasks`

Response

```json
{
  {
    "id": 1,
    "title": "API Routes",
    "task_description": "Set up API Routes",
    "priority_id": 2,
    "status_id": 4,
    "project_id": 1,
    "plan_start": "2021-08-27",
    "plan_end": "2021-08-28",
    "kanban_order": -1,
    "proj_name": "KanPlan",
    "priority_name": "Low",
    "status": "Done",
    "task_users": [
      ...
    ]
  }
}
```

### Users

`GET /api/users`

Response

```json
{
  {
    "id": 1,
    "user_name": "TJ Jung",
    "email": "thisis@email.com",
    "last_login": "2021-09-11T02:56:02.261Z",
    "user_tasks": [
      ...
    ],
    "user_projects": [
      ...
    ]
  }
}
```

### Members

`GET /api/member/project/:id`

Response

```json
{
  {
    "manager_id": 1,
    "project_id": 1,
    "team_members": [
      ...
    ]
  }
}
```

### Kanban Orders

`GET /api/kanban/project/:id`

Response

```json
{
  {
    "id": 1,
    "status": "To-Do",
    "task_id": [
      ...
    ]
  }
}
```

# Getting Started (/client)

## Install dependencies

Install dependencies with `npm install`

## Running

Running Webpack Development client by `npm start`

# Others

## Warnings & Tips

- Use the browser to navigate to `http://localhost:8001/api/debug/reset` each time there is a change to the database schema or seeds.
- It runs through each of the files, in order, and executes them against the database.
- Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 12.x
- NPM 6.x
- PG 6.x
- axios
- body-parser
- cors
- dotenv
- express
- helmet
- morgan
- nodemon
- pg
- socket.io
- storybook
- material-ui
- syncfusion/ej2-react-gantt
- chart.js
- moment
- react
- react-beautiful-dnd
- react-dom
- react-router-dom
- react-webcam
- react-chartjs-2
- react-scripts
- react-scroll-to-bottom
- socket.io-client
- sass

## Licenses

The syncfusion library used for the Gantt chart was utilized under the free community license provided by syncfusion.
