const express = require('express');
const router = express.Router();
const { SectionLabel } = require('../models'); // sequelize 불러오기

// 모든 sectionLabel 정보를 가져오는 엔드포인트
router.get('/', async (req, res) => {
  try {
    const sectionLabels = await SectionLabel.findAll();
    res.json(sectionLabels);
  } catch (error) {
    res.status(500).json({ error: 'sectionLabel을 가져오는 중 오류가 발생했습니다.' });
  }
});

// industry_type ENUM 값을 가져오는 엔드포인트
router.get('/main_section_2', (req, res) => {
  try {
    const enumValues = SectionLabel.getMainSection2Types(); // 모델에서 직접 ENUM 값을 가져옴
    res.json(enumValues);
  } catch (error) {
    res.status(500).json({ error: '산업군 정보를 가져오는 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
