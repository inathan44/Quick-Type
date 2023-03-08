const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config;

const PORT = 3000;

app.use(express.json());

async function init() {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

init();
