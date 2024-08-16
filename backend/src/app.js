const express = require('express');
const { sequelize } = require('./models');
const { corsMiddleware } = require('./middlewares');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync();
});
