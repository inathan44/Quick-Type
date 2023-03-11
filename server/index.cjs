const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config;
const cors = require('cors');
const cookieparser = require('cookie-parser');

const PORT = 8200;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieparser());
// app.use('*', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });
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
