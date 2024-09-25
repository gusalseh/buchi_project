const express = require('express');
const axios = require('axios');
const router = express.Router();

const authRoutes = require('./auth');
router.use('/auth', authRoutes);

const imageRoutes = require('./image');
router.use('/image', imageRoutes);

const userLocationRoutes = require('./userLocation');
router.use('/userLocation', userLocationRoutes);

const companyRoutes = require('./company');
router.use('/companies', companyRoutes);

const sectionLabelRoutes = require('./sectionLabel');
router.use('/sectionLabels', sectionLabelRoutes);

const spotRoutes = require('./spot');
router.use('/spots', spotRoutes);

const visitRoutes = require('./visit');
router.use('/visits', visitRoutes);

const companySpotVisitRoutes = require('./companySpotVisit');
router.use('/company_spot_visits', companySpotVisitRoutes);

router.get('/reverse_geocode', async (req, res) => {
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

router.post('/geocode', async (req, res) => {
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

module.exports = router;
