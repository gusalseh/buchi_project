const express = require('express');
const { sequelize } = require('./models');
const { corsMiddleware } = require('./middlewares');
const passport = require('passport');
require('./passport/index')();

const app = express();

// 미들웨어 설정
app.use(corsMiddleware);
app.use(express.json());

// Passport 초기화
app.use(passport.initialize());

// 라우트 설정
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync();
});
