"use strict";

require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

require('./startup/validation')();
require('./startup/asyncErrors')();
require('./startup/db')();
require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/prod')(app);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));