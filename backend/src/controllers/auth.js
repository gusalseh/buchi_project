const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

exports.join = async (req, res, next) => {
  const { email, name, nickname, password, gender, birth, mobile } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      name,
      nickname,
      password: hash,
      mobile,
      gender,
      birth,
      company_name,
      company_branch,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('naver', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?error=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // 세션 쿠키 삭제
      res.status(200).json({ message: 'Logged out successfully' }); // 클라이언트로 응답 전송
    });
  });
};
