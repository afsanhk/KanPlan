const router = require("express").Router();

module.exports = (db) => {
  router.get("/messages", (request, response) => {
    const values = [request.params.id];
    db.query(`SELECT * FROM messages ORDER BY created_at`).then(({ rows: message_text }) => {
      response.json(message_text);
    });
  });

  router.post("/messages", (request, response) => {
    console.log("Message API received a POST request: ", request.body);

    const values = [request.body.user_id, request.body.message_text, request.body.created_at];

    let query = `INSERT INTO messages (user_id, message_text, created_at)
    VALUES ($1, $2, $3)`;

    db.query(query, values)
      .then((res) => console.log("Insertion successful"))
      .catch((err) => console.log(err));
  });

  return router;
};
