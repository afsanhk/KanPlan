const router = require("express").Router();

module.exports = (db) => {
  router.get("/projects", (request, response) => {
    db.query(
      `SELECT projects.*,users.user_name as manager_name, array_agg(DISTINCT project_members.user_id) AS team_members 
      FROM projects 
      JOIN users ON projects.manager_id = users.id
      JOIN project_members ON project_members.project_id = projects.id
      GROUP BY projects.id, users.user_name
      ORDER BY projects.id`
    ).then(({ rows: projects }) => {
      response.json(projects);
    });
  });

  return router;
};
