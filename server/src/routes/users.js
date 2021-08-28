const router = require("express").Router();

module.exports = (db) => {
  router.get("/users", (request, response) => {
    db.query(
      `SELECT users.*, 
              array_agg(DISTINCT tasks.id) AS user_tasks,
              project_members.project_id
      FROM users
      JOIN project_members ON project_members.user_id = users.id
      LEFT JOIN user_tasks ON user_tasks.user_id = users.id 
      LEFT JOIN tasks ON user_tasks.task_id = tasks.id
      GROUP BY users.id, project_members.project_id`
    ).then(({ rows: users }) => {
      response.json(users);
    });
  });

  return router;
};
