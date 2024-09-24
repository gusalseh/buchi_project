const express = require('express');
const router = express.Router();

const { getVisitReviewJoinDB } = require('../controllers/visit');

// 모든 sectionLabel 정보를 가져오는 엔드포인트
router.get('/', getVisitReviewJoinDB);

module.exports = router;
