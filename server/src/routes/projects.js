const router = require("express").Router();

module.exports = (db) => {
  router.get("/projects", (request, response) => {
    db.query(
      `SELECT projects.*,users.user_name as manager_name 
      FROM projects 
      JOIN users ON manager_id = users.id`
    ).then(({ rows: projects }) => {
      response.json(projects);
    });
  });

  return router;
};
