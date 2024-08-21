const express = require('express');
const session = require('express-session');
const { sequelize } = require('./models');
const { corsMiddleware } = require('./middlewares');
const passport = require('passport');
require('./passport/index')();

const app = express();

// 미들웨어 설정
app.use(corsMiddleware);
app.use(express.json());

// 세션 설정
app.use(
  session({
    secret: process.env.SESSION_PRIVATE_KEY, // 세션 암호화를 위한 비밀 키
    resave: false, // 세션이 변경되지 않아도 항상 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션도 저장할지 여부
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // HTTPS 환경에서는 쿠키를 전송을 위해 반드시 true로 설정, 1일 동안 유효
  })
);

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// 라우트 설정
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const s3Routes = require('./routes/s3');
app.use('/s3', s3Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync();
});
