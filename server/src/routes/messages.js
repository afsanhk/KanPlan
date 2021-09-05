const router = require('express').Router();

module.exports = (db) => {
  router.get('/messages', (request, response) => {
    const values = [request.params.id];
    db.query(`SELECT * FROM messages`).then(({ rows: message_text }) => {
      response.json(message_text);
    });
  });

  return router;
};
