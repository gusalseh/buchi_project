const express = require('express');
const router = express.Router();
const { Company, User } = require('../models'); // sequelize 불러오기

// 모든 회사 정보를 가져오는 엔드포인트
router.get('/', async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: '데이터를 가져오는 중 오류가 발생했습니다.' });
  }
});

// industry_type ENUM 값을 가져오는 엔드포인트
router.get('/industry-types', (req, res) => {
  try {
    const enumValues = Company.getIndustryTypes(); // 모델에서 직접 ENUM 값을 가져옴
    res.json(enumValues);
  } catch (error) {
    res.status(500).json({ error: '산업군 정보를 가져오는 중 오류가 발생했습니다.' });
  }
});

// 회사명이 이미 존재하는지 확인하는 라우트
router.post('/check-company', async (req, res) => {
  const { company_name } = req.body;

  try {
    const company = await Company.findOne({ where: { company_name } });

    if (company) {
      return res.status(409).json({ message: '이미 존재하는 회사입니다.' });
    }

    return res.status(200).json({ message: '새로운 회사명입니다.' });
  } catch (error) {
    console.error('회사 확인 중 오류 발생:', error);
    return res.status(500).json({ message: '서버 오류' });
  }
});

// 백엔드 코드 (예: Express.js)
router.post('/add-company', async (req, res) => {
  const { company_name, industry_type } = req.body;

  try {
    const newCompany = await Company.create({
      company_name,
      industry_type,
    });
    console.log('New Company Created:', newCompany); // 생성된 회사 로그 확인

    // 새로 생성된 회사의 ID를 포함하여 응답 반환
    return res.status(201).json({ message: '새 회사가 추가되었습니다.', company: newCompany });
  } catch (error) {
    console.error('새 회사 추가 중 오류 발생:', error);
    return res.status(500).json({ message: '서버 오류' });
  }
});

module.exports = router;
