const express = require('express');
const passport = require('passport');
const { User } = require('../models');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

console.log('join:', join);
console.log('login:', login);
console.log('logout:', logout);
console.log('isLoggedIn:', isLoggedIn);
console.log('isNotLoggedIn:', isNotLoggedIn);

const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// GET /auth/naver
router.get(
  '/naver',
  (req, res, next) => {
    console.log('GET /auth/naver route hit'); // 네이버 로그인 라우트 확인
    next();
  },
  passport.authenticate('naver', { authType: 'reprompt' })
);

// GET /auth/naver/callback
router.get(
  '/naver/callback',
  (req, res, next) => {
    console.log('GET /auth/naver/callback route hit'); // 콜백 라우트 확인
    next();
  },
  passport.authenticate('naver', {
    failureRedirect: '/?error=네이버로그인 실패',
  }),
  (req, res) => {
    const user = {
      email: req.user.email,
      nickname: req.user.nickname,
    };
    console.log('Naver login successful, redirecting...'); // 로그인 성공 후 리다이렉트 확인
    res.redirect('http://localhost:3000/');
  }
);

// 사용자 정보를 반환하는 API 엔드포인트
router.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// 사용자 company_id Update 엔드포인트
router.put('/update-company', isLoggedIn, async (req, res) => {
  console.log('PUT /auth/update-company hit');
  console.log('Authenticated user:', req.user); // req.user가 설정되어 있는지 확인

  const { companyId } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const user = await User.findByPk(req.user.user_id); // 현재 로그인한 사용자 정보를 가져옴
    console.log('Found user:', user); // user 객체를 출력하여 확인
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.company_id = companyId; // company_id 업데이트

    await user.save(); // 변경 사항 저장

    res.json({ message: 'Company ID updated successfully', user });
  } catch (saveError) {
    console.error('Error saving company ID:', saveError);
    res.status(500).json({ message: 'Error saving company ID' });
  }
});

module.exports = router;
