const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config;
const  cors = require('cors');

const PORT = 3030;
app.use(express.json());
app.use(cors());
app.use('/api', require('./api.cjs'))

async function init() {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

init();
