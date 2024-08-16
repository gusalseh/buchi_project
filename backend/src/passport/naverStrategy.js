const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: "/auth/naver/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("naver profile", profile);
        try {
          const exUser = await User.findOne({
            where: { email: profile.emails[0].value },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile.emails[0].value,
              nick: profile.displayName,
              sex: profile.gender,
              birth: profile.birthyear + profile.birthday,
              mobile: profile.mobile,
              provider: "naver",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
