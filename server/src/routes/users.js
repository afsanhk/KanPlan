const router = require("express").Router();

module.exports = (db) => {
  router.get("/users", (request, response) => {
    db.query(
      `SELECT users.*, 
              array_agg(DISTINCT user_tasks.task_id) AS user_tasks,
              array_agg(DISTINCT project_members.project_id) AS user_projects
      FROM users
      LEFT JOIN user_tasks ON user_tasks.user_id = users.id 
      JOIN project_members ON project_members.user_id = users.id
      GROUP BY users.id`
    ).then(({ rows: users }) => {
      response.json(users);
    });
  });

  return router;
};
