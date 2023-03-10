const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config;
const cors = require('cors');

const PORT = 3030;
app.use(express.json());
app.use(cors());
app.use('/api', require('./api.cjs'));
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'internal server error');
});

async function init() {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

init();
