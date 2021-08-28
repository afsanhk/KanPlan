const router = require("express").Router();

module.exports = (db) => {
  router.get("/tasks", (request, response) => {
    db.query(
      `SELECT tasks.*, 
              proj_name, 
              priority_name, 
              status 
      FROM tasks 
      JOIN priorities ON tasks.priority_id = priorities.id
      JOIN projects ON tasks.project_id = projects.id
      JOIN kanban_status ON tasks.status_id = kanban_status.id
      ORDER BY tasks.id`
    ).then(({ rows: tasks }) => {
      response.json(tasks);
    });
  });

  return router;
};
