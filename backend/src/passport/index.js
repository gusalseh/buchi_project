const passport = require("passport");
const naver = require("./naverStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serialize");
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserialize");
    User.findOne({
      where: { id },
      include: [],
    })
      .then((user) => {
        console.log("user", user);
        done(null, user);
      })
      .catch((err) => done(err));
  });

  naver();
};
