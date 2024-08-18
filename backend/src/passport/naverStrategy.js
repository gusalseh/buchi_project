const passport = require("passport");
const {
  Strategy: NaverStrategy,
  Profile: NaverProfile,
} = require("passport-naver-v2");

const User = require("../models/user");

module.exports = () => {
  console.log("Initializing Naver Strategy"); // 전략 초기화 시 로그
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/naver/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("naver profile", profile);
        try {
          const exUser = await User.findOne({
            where: { email: profile.email },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const email = profile.email || profile._json.response.email;
            const birthyear = profile.birthYear;
            const birthday = profile.birthday;
            const fullBirthday = `${birthyear}-${birthday}`;

            const newUser = await User.create({
              email: email,
              nick: profile.nickname,
              gender: profile.gender,
              birth: fullBirthday,
              mobile: profile.mobile,
              provider: "naver",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error("Error during Naver authentication:", error); // 오류 발생 시 로그
          done(error);
        }
      }
    )
  );
};
