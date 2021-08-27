const router = require("express").Router();

module.exports = (db) => {
  router.get("/projects", (request, response) => {
    db.query(
      `SELECT projects.*,
              users.user_name as manager_name, 
              array_agg(DISTINCT project_members.user_id) AS team_members,
              array_agg(DISTINCT tasks.id) AS project_tasks
      FROM projects 
      JOIN users ON projects.manager_id = users.id
      JOIN project_members ON project_members.project_id = projects.id
      LEFT JOIN tasks ON tasks.project_id = projects.id
      GROUP BY projects.id, users.user_name
      ORDER BY projects.id`
    ).then(({ rows: projects }) => {
      response.json(projects);
    });
  });

  return router;
};
//

// // Buggy query with 33 tasks and only one project -- it is returning for each team member
// `SELECT projects.*,
//               users.user_name as manager_name,
//               array_agg(DISTINCT project_members.user_id) AS team_members,
//               array_agg(DISTINCT tasks.id) AS project_tasks,
//               json_agg(json_build_object('task_id', tasks.id, 'task_title', tasks.title, 'task_description', tasks.task_description, 'priority_id', tasks.priority_id, 'status_id', tasks.status_id, 'plan_start', tasks.plan_start, 'plan_end', tasks.plan_end)) AS project_task
//       FROM projects
//       JOIN users ON projects.manager_id = users.id
//       JOIN project_members ON project_members.project_id = projects.id
//       LEFT JOIN tasks ON tasks.project_id = projects.id
//       GROUP BY projects.id, users.user_name
//       ORDER BY projects.id`
