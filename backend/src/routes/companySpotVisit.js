const express = require('express');
const router = express.Router();

const { getUserCompanyVisitData } = require('../controllers/companySpotVisit');

// 모든 sectionLabel 정보를 가져오는 엔드포인트
router.get('/', getUserCompanyVisitData);

module.exports = router;
