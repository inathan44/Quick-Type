const express = require('express');
const app = express();
const dotenv = require('dotenv').config;
const cors = require('cors');

const PORT = process.env.PORT || 3030;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', require('./api.cjs'));
app.get('/', (req, res, next) => {
  res.send('backend running');
});
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'internal server error');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
