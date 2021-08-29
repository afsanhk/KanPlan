const router = require("express").Router();

module.exports = (db) => {
  router.get("/tasks", (request, response) => {
    db.query(
      `SELECT tasks.*, 
              proj_name, 
              priority_name, 
              status,
              array_agg(DISTINCT user_tasks.user_id) AS task_users 
      FROM tasks 
      JOIN priorities ON tasks.priority_id = priorities.id
      JOIN projects ON tasks.project_id = projects.id
      JOIN kanban_status ON tasks.status_id = kanban_status.id
      JOIN user_tasks ON tasks.id = user_tasks.task_id
      GROUP BY tasks.id, proj_name, priority_name, status
      ORDER BY tasks.id`
    ).then(({ rows: tasks }) => {
      response.json(tasks.reduce((previous, current) => ({ ...previous, [current.id]: current }), {}));
    });
  });

  return router;
};
