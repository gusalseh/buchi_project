const passport = require('passport');
const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
const axios = require('axios');

const User = require('../models/user');

module.exports = () => {
  console.log('Initializing Naver Strategy'); // 전략 초기화 시 로그
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/naver/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('naver profile', profile);
        try {
          const email = profile.email || profile._json.response.email;
          let user = await User.findOne({
            where: { email },
          });

          if (!user) {
            // 새 사용자 생성
            const birthyear = profile.birthYear;
            const birthday = profile.birthday;
            const fullBirthday = `${birthyear}-${birthday}`;

            user = await User.create({
              email: email,
              nickname: profile.nickname,
              gender: profile.gender,
              birth: fullBirthday,
              mobile: profile.mobile,
              provider: 'naver',
              agreement: false, // 기본 값은 false로 설정
            });
          }

          // 약관 동의 상태 확인 API 호출
          const response = await axios.get('https://openapi.naver.com/v1/nid/agreement', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const agreementData = response.data;
          console.log('agreementData:', agreementData);

          // 'term5'가 존재하는지 확인
          const hasTerm5 = agreementData.agreementInfos.some((info) => info.termCode === 'term5');

          if (hasTerm5) {
            // 'term5'가 존재하면 agreement 칼럼을 true로 업데이트
            await User.update({ agreement: true }, { where: { email } });
            console.log('User agreement updated to true');
          } else {
            console.log('term5 not found, no action taken');
          }

          done(null, user);
        } catch (error) {
          console.error('Error during Naver authentication:', error); // 오류 발생 시 로그
          done(error);
        }
      }
    )
  );
};
