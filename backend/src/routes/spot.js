const express = require('express');
const router = express.Router();
const { Spot } = require('../models');
const { getSpotList, getSpotByDist, getSpotById } = require('../controllers/spot');

router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll();
    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: 'spot을 가져오는 중 오류가 발생했습니다.' });
  }
});

router.get('/spotlist', getSpotList);

router.get('/spotlistById/:spot_id', getSpotById);

router.post('/getSpotByDistance', getSpotByDist);

module.exports = router;
