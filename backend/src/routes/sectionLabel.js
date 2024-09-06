const express = require('express');
const router = express.Router();

const {
  getSectionLabel,
  getRandomSectionType,
  getSectionLabelList,
  getRandomSubSection1Type,
  getSubSection1LabelList,
  getRandomSubSection2Type,
  getSubSection2LabelList,
  getRandomSubSection3Type,
  getSubSection3LabelList,
  getRandomSubSection4Type,
  getSubSection4LabelList,
  getRandomSubSection5Type,
  getSubSection5LabelList,
} = require('../controllers/sectionLabel');

// 모든 sectionLabel 정보를 가져오는 엔드포인트
router.get('/', getSectionLabel);

// main_section_2 ENUM 값을 랜덤으로 가져오는 엔드포인트
router.get('/main_section_2_random', getRandomSectionType);
// main_section_2 ENUM 값으로 spot과 join한 값을 가져오는 엔드포인트
router.get('/main_section_list', getSectionLabelList);

// sub_section_1 ENUM 값을 랜덤으로 가져오는 엔드포인트
router.get('/sub_section_1_random', getRandomSubSection1Type);
// sub_section_1 ENUM 값으로 spot과 join한 값을 가져오는 엔드포인트
router.get('/sub_section_1_list', getSubSection1LabelList);

// sub_section_2 ENUM 값을 랜덤으로 가져오는 엔드포인트
router.get('/sub_section_2_random', getRandomSubSection2Type);
// sub_section_2 ENUM 값으로 spot과 join한 값을 가져오는 엔드포인트
router.get('/sub_section_2_list', getSubSection2LabelList);

// sub_section_3 ENUM 값을 랜덤으로 가져오는 엔드포인트
router.get('/sub_section_3_random', getRandomSubSection3Type);
// sub_section_3 ENUM 값으로 spot과 join한 값을 가져오는 엔드포인트
router.get('/sub_section_3_list', getSubSection3LabelList);

// sub_section_4 ENUM 값을 랜덤으로 가져오는 엔드포인트
router.get('/sub_section_4_random', getRandomSubSection4Type);
// sub_section_4 ENUM 값으로 spot과 join한 값을 가져오는 엔드포인트
router.get('/sub_section_4_list', getSubSection4LabelList);

// sub_section_5 ENUM 값을 랜덤으로 가져오는 엔드포인트
router.get('/sub_section_5_random', getRandomSubSection5Type);
// sub_section_5 ENUM 값으로 spot과 join한 값을 가져오는 엔드포인트
router.get('/sub_section_5_list', getSubSection5LabelList);

module.exports = router;
