const router = require('express').Router();

module.exports = (db) => {
  router.get('/kanban/project/:id', (request, response) => {
    const values = [request.params.id];
    db.query(
      `SELECT kanban_status.*,
              array_agg(tasks.id ORDER BY tasks.kanban_order, tasks.id ASC) AS task_id
      FROM kanban_status 
      JOIN tasks ON kanban_status.id = tasks.status_id
      WHERE tasks.project_id = $1
      GROUP BY kanban_status.id
      ORDER BY kanban_status.id`,
      values
    ).then(({ rows: tasks }) => {
      response.json(tasks);
    });
  });

  router.put('/kanban/project/:id', (request, response) => {
    const { statusIDs, kanbanOrders } = request.body;
    let orderCondition = '';
    let statusCondition = '';
    let taskIDs = '(';

    statusIDs.forEach((statusID, index1) => {
      kanbanOrders[index1].forEach((taskID, index2) => {
        orderCondition += `WHEN ${taskID} THEN ${index2}\n`;
        statusCondition += `WHEN ${taskID} THEN ${statusID}\n`;
        if (index1 === statusIDs.length - 1 && index2 === kanbanOrders[index1].length - 1) {
          taskIDs += taskID + ')';
        } else {
          taskIDs += taskID + ',';
        }
      });
    });

    // console.log(orderCondition, statusCondition, taskIDs);

    db.query(
      `
          UPDATE tasks
          SET kanban_order = CASE id
                             ${orderCondition}
                             ELSE kanban_order
                             END,
              status_id = CASE id
                          ${statusCondition}
                          ELSE status_id
                          END
          WHERE id IN ${taskIDs}
          RETURNING tasks;
          `
    )
      .then((res) => response.send(res.rows))
      .catch((error) => console.log(error));
  });

  return router;
};
