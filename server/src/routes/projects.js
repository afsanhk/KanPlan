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
      response.json(projects.reduce((previous, current) => ({ ...previous, [current.id]: current }), {}));
    });
  });

  router.post("/projects", (request, response) => {
    console.log(`Server is receiving a post request to projects with payload:`, request.body);
    const { proj_name, manager_id, planned_start, planned_end, proj_description, team_members } = request.body;
    console.log(
      `Server side proj_name ${proj_name}, manager_id ${manager_id}, planned_start ${planned_start}, planned_end ${planned_end}, proj_description ${proj_description} & team_members ${team_members}`
    );
    // First query inserts inro projects
    db.query(
      `INSERT INTO projects (proj_name, manager_id, planned_start, planned_end, proj_description) 
       VALUES ($1::text, $2::integer, $3, $4, $5::text)
       RETURNING id;
      `,
      [proj_name, manager_id, planned_start, planned_end, proj_description]
    ).then((res) => console.log(res.rows[0]));
    //   .then((res) => {
    //     if (task_users.length) {
    //       let query = '';
    //       const task_id = res.rows[0].id;
    //       for (const user_id of task_users) {
    //         query += '(' + task_id + ',' + user_id + ')';
    //         if (!(task_users.indexOf(user_id) === task_users.length - 1)) {
    //           query += ',\n';
    //         }
    //       }
    //       db.query(
    //         `
    //         INSERT INTO user_tasks(task_id, user_id)
    //         VALUES ${query}
    //         RETURNING task_id;
    //         `
    //       )
    //         .then((res) => {
    //           // console.log(res.rows[0]);
    //           response.send(res.rows[0]);
    //         })
    //         .catch((error) => console.log(error));
    //     }
    //   })
    //   .catch((error) => console.log(error));
  });

  router.delete("/projects/:id", (request, response) => {
    db.query("DELETE FROM projects WHERE id = $1::integer", [request.params.id])
      .then(() => {
        response.status(204).json({});
      })
      .catch((error) => console.log(error));
  });

  return router;
};
