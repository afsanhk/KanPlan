const router = require("express").Router();

module.exports = (db) => {
  router.get("/users", (request, response) => {
    db.query(
      `SELECT users.*, 
              array_agg(DISTINCT tasks.id) AS user_tasks 
      FROM users
      JOIN user_tasks ON user_tasks.user_id = users.id 
      JOIN tasks ON user_tasks.task_id = tasks.id
      GROUP BY users.id`
    ).then(({ rows: users }) => {
      response.json(users);
    });
  });

  return router;
};
