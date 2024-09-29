const passport = require('passport');
const naver = require('./naverStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('serialize');
    done(null, user.user_id);
  });

  passport.deserializeUser((user_id, done) => {
    console.log('deserialize');
    User.findOne({
      where: { user_id },
      include: [],
    })
      .then((user) => {
        console.log('user', user);
        done(null, user);
      })
      .catch((err) => done(err));
  });
  console.log('Initializing Naver Strategy in index.js');
  naver();
};
