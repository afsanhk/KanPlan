const router = require("express").Router();

module.exports = (db) => {
  router.get("/tasks", (request, response) => {
    db.query(
      `SELECT tasks.*,priority_name FROM tasks JOIN priority ON tasks.priority_id = priority.id`
    ).then(({ rows: tasks }) => {
      response.json(tasks);
    });
  });

  return router;
};
