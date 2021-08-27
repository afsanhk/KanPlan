const router = require('express').Router();

module.exports = (db) => {
  router.get('/tasks', (request, response) => {
    db.query(`SELECT * FROM tasks`).then(({ rows: tasks }) => {
      response.json(tasks);
    });
  });

  return router;
};
