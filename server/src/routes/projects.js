const router = require('express').Router();

module.exports = (db) => {
  router.get('/projects', (request, response) => {
    db.query(`SELECT * FROM projects`).then(({ rows: projects }) => {
      response.json(projects);
    });
  });

  return router;
};
