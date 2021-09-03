const router = require('express').Router();

module.exports = (db) => {
  router.get('/tasks', (request, response) => {
    db.query(
      `SELECT tasks.*, 
              proj_name, 
              priority_name, 
              status,
              CASE 
                WHEN user_tasks.task_id IS NULL
                THEN ARRAY[]::integer[]
                ELSE array_agg(DISTINCT user_tasks.user_id)
              END
                AS task_users 
      FROM tasks 
      JOIN priorities ON tasks.priority_id = priorities.id
      JOIN projects ON tasks.project_id = projects.id
      JOIN kanban_status ON tasks.status_id = kanban_status.id
      FULL JOIN user_tasks ON tasks.id = user_tasks.task_id
      GROUP BY tasks.id, proj_name, priority_name, status, user_tasks.task_id
      `
    ).then(({ rows: tasks }) => {
      response.json(tasks.reduce((previous, current) => ({ ...previous, [current.id]: current }), {}));
    });
  });

  router.post('/tasks', (request, response) => {
    const { title, task_description, priority_id, status_id, plan_start, plan_end, proj_name, priority_name, status, task_users, project_id } = request.body;
    // console.log(title, task_description, priority_id, status_id, plan_start, plan_end, proj_name, priority_name, status, task_users);

    db.query(
      `INSERT INTO tasks (title, task_description, priority_id, status_id, project_id, plan_start, plan_end)
       VALUES ($1::text, $2::text, $3::integer, $4::integer, $5::integer, $6, $7)
       RETURNING id;
      `,
      [title, task_description, priority_id, status_id, project_id, plan_start, plan_end]
    )
      .then((res) => {
        if (task_users.length) {
          let query = '';
          const task_id = res.rows[0].id;
          for (const user_id of task_users) {
            query += '(' + task_id + ',' + user_id + ')';
            if (!(task_users.indexOf(user_id) === task_users.length - 1)) {
              query += ',\n';
            }
          }
          db.query(
            `
            INSERT INTO user_tasks(task_id, user_id)
            VALUES ${query}
            RETURNING task_id;
            `
          )
            .then((res) => {
              // console.log(res.rows[0]);
              response.send(res.rows[0]);
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  });

  router.put('/tasks/:id/status', (request, response) => {
    const { id, status_id, kanban_order } = request.body;
    db.query(
      `
      UPDATE tasks 
      SET status_id = $1, kanban_order = $2
      WHERE id = $3;
      `,
      [status_id, kanban_order, id]
    )
      .then((res) => {
        response.send(res);
      })
      .catch((error) => console.log(error));
  });

  router.put('/tasks/:id', (request, response) => {
    const { task_description, plan_start, plan_end, task_users, priority_id, status_id, id } = request.body.newTaskFullData;

    db.query(
      `
      UPDATE tasks 
      SET task_description = $1,
        plan_start = $2,
        plan_end = $3,
        priority_id = $4,
        status_id = $5
        WHERE id = $6;
      `, [task_description, plan_start, plan_end, priority_id, status_id, id]
    )

    //get current task users

    db.query(
      `SELECT user_id FROM user_tasks WHERE task_id = $1;`, [id]
    )
      .then((res) => {
        const query_users = res.rows.map(row => row.user_id)
        const new_users = task_users.filter(task_user => !query_users.includes(task_user))
        const deleted_users = query_users.filter(task_user => !task_users.includes(task_user))
        
        //adds new users
        new_users.forEach(new_user => {
          db.query (
            `
            INSERT INTO user_tasks (user_id, task_id)
            VALUES ($1, $2)
            `, [new_user, id]
          )
        })

        //deletes new users
        deleted_users.forEach(old_user => {
          db.query (
            `
            DELETE FROM user_tasks WHERE user_id = $1 AND task_id = $2;
            `, [old_user, id]
          )
        })
      })
      .catch((error) => console.log(error));
  })

  router.delete('/tasks/:id', (request, response) => {
    db.query('DELETE FROM tasks WHERE id = $1::integer', [request.params.id])
      .then(() => {
        response.status(204).json({});
      })
      .catch((error) => console.log(error));
  });

  return router;
};
