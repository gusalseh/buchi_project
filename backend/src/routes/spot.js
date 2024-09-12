const express = require('express');
const router = express.Router();
const { Spot } = require('../models'); // sequelize 불러오기
const { getSpotList, getSpotByDist } = require('../controllers/spot');

// 모든 spot 정보를 가져오는 엔드포인트
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll();
    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: 'spot을 가져오는 중 오류가 발생했습니다.' });
  }
});

//spot과 sectionLabel, visit, review 데이터 join한 정보 가져오는 엔드포인트
router.get('/spotlist', getSpotList);

router.post('/getSpotByDistance', getSpotByDist);

module.exports = router;
