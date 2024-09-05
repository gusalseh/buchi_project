const express = require('express');
const router = express.Router();

const { getSectionLabel, getRandomSectionType, getSectionLabelList } = require('../controllers/sectionLabel');

// 모든 sectionLabel 정보를 가져오는 엔드포인트
router.get('/', getSectionLabel);

// main_section_2 ENUM 값을 랜덤으로 가져오는 엔드포인트
router.get('/main_section_2_random', getRandomSectionType);

// main_section_2 ENUM 값으로 spot과 join한 값을 가져오는 엔드포인트
router.get('/main_section_list', getSectionLabelList);

module.exports = router;
