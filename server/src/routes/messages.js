const router = require('express').Router();

module.exports = (db) => {
  router.get('/messages', (request, response) => {
    const values = [request.params.id];
    db.query(`SELECT id, user_id, message_text, created_at AT TIME ZONE 'GMT' FROM messages`).then(({ rows: message_text }) => {
      response.json(message_text);
    });
  });

  return router;
};
