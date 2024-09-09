require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const { sequelize } = require('./models');
const { corsMiddleware } = require('./middlewares');
const passport = require('passport');
require('./passport/index')();

const app = express();

// 미들웨어 설정
app.use(corsMiddleware);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

const imageRoutes = require('./routes/image');
app.use('/image', imageRoutes);

const userLocationRoutes = require('./routes/userLocation');
app.use('/api/userLocation', userLocationRoutes);

const companyRoutes = require('./routes/company');
app.use('/api/companies', companyRoutes);

const sectionLabelRoutes = require('./routes/sectionLabel');
app.use('/api/sectionLabels', sectionLabelRoutes);

const spotRoutes = require('./routes/spot');
app.use('/api/spots', spotRoutes);

const visitRoutes = require('./routes/visit');
app.use('/api/visits', visitRoutes);

app.get('/reverse_geocode', async (req, res) => {
  const { lat, lon } = req.query;
  const response = await axios.get(
    `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lon},${lat}&orders=roadaddr&output=json`,
    {
      method: 'GET',
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_MAP_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': process.env.NAVER_MAP_CLIENT_SECRET,
      },
    }
  );
  const data = response.data;
  res.json(data);
});

app.post('/geocode', async (req, res) => {
  const { address } = req.body;

  try {
    const response = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_MAP_CLIENT_ID,
          'X-NCP-APIGW-API-KEY': process.env.NAVER_MAP_CLIENT_SECRET,
        },
      }
    );

    if (response.data.addresses.length === 0) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const { y: latitude, x: longitude } = response.data.addresses[0];
    res.json({ latitude, longitude });
  } catch (error) {
    console.error('Error fetching geocode:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync();
});
