const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

const db = require('./db');

const users = require('./routes/users');
const projects = require('./routes/projects');
const tasks = require('./routes/tasks');
const kanbanTasks = require('./routes/kanban_tasks');
const projectMembers = require('./routes/project_members');
const messages = require('./routes/messages');

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: 'utf-8'
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = function application(ENV) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  app.use('/api', users(db));
  app.use('/api', projects(db));
  app.use('/api', tasks(db));
  app.use('/api', kanbanTasks(db));
  app.use('/api', projectMembers(db));
  app.use('/api', messages(db));

  if (ENV === 'development' || ENV === 'test') {
    Promise.all([read(path.resolve(__dirname, `db/schema/create.sql`)), read(path.resolve(__dirname, `db/schema/${ENV}.sql`))])
      .then(([create, seed]) => {
        app.get('/api/debug/reset', (request, response) => {
          db.query(create)
            .then((result) => {
              db.query(seed);
            })
            .then(() => {
              console.log('Database Reset');
              response.status(200).send('Database Reset');
            });
        });
      })
      .catch((error) => {
        console.log(`Error setting up the reset route: ${error}`);
      });
  }

  app.close = function () {
    return db.end();
  };

  return app;
};
