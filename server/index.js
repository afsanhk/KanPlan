// This will contain all server code.
// load .env data into process.env
require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 5000;

const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

// need to install dot-env
