const express = require('express');
const passport = require('passport');

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
    // res.redirect('http://localhost:3001/');
    res.redirect(`http://localhost:3001/?email=${user.email}&nickname=${user.nickname}`);
  }
);

module.exports = router;
