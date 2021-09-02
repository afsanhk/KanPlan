const router = require('express').Router();

module.exports = (db) => {
  router.get('/kanban/project/:id', (request, response) => {
    const values = [request.params.id];
    db.query(
      `SELECT kanban_status.*,
              array_agg(DISTINCT tasks.id) AS task_id 
      FROM kanban_status 
      JOIN tasks ON kanban_status.id = tasks.status_id
      WHERE tasks.project_id = $1
      GROUP BY kanban_status.id
      ORDER BY kanban_status.id`,
      values
    ).then(({ rows: tasks }) => {
      response.json(tasks);
    });
  });

  return router;
};
