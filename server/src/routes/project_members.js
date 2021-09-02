const router = require('express').Router();

module.exports = (db) => {
  router.get('/member/project/:id', (request, response) => {
    const values = [request.params.id];
    db.query(
      `SELECT projects.manager_id, projects.id as project_id,
              array_agg(DISTINCT users.id) AS team_members
      FROM project_members
      JOIN projects ON projects.id = project_members.project_id
      JOIN users ON project_members.user_id = users.id
      WHERE projects.id = $1
      GROUP BY projects.id
      `,
      values
    ).then(({ rows: project_members }) => {
      response.json(project_members.reduce((previous, current) => ({ ...previous, [current.project_id]: current }), {}));
    });
  });

  router.put('/member/project/:id', (request, response) => {
    const { team_members, deleted_members, deleted_tasks } = request.body;
    const project_id = request.params.id;

    // console.log(deleted_members, deleted_tasks);

    if (deleted_members) {
      deleted_members.forEach((member_id, index) => {
        db.query(
          `
          DELETE FROM project_members
          WHERE project_id = $1 AND user_id = $2
        `,
          [project_id, member_id]
        ).then(() => {
          deleted_tasks[index].forEach((task_id) => {
            db.query(
              `
              DELETE FROM user_tasks
              WHERE task_id = $1 AND user_id = $2
              `,
              [task_id, member_id]
            ).catch((error) => console.log(error));
          });
        });
      });
    } else {
      let value = '';

      team_members.forEach((member_id, index) => {
        if (index !== team_members.length - 1) {
          value += `(${project_id},${member_id}),\n`;
        } else {
          value += `(${project_id},${member_id})`;
        }
      });

      const query = `INSERT INTO project_members(project_id, user_id)
      VALUES ${value}
      `;

      // console.log(query);
      db.query(query).then(() => {
        response.status(204).json({});
      });
    }
  });

  return router;
};
