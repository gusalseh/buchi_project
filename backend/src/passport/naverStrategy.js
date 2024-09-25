require('dotenv').config();
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
        callbackURL: 'https://d6utypy1uf0r7.cloudfront.net/api/auth/naver/callback',
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
              name: profile.name,
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

          // term4, term5가 존재하는지 확인
          const agreementData = response.data;
          const hasTerm4 = agreementData.agreementInfos.some((info) => info.termCode === 'term4');
          const hasTerm5 = agreementData.agreementInfos.some((info) => info.termCode === 'term5');

          // term4가 존재하면 agreement_sms 칼럼을 true로 업데이트
          // term5가 존재하면 agreement_email 칼럼을 true로 업데이트
          if (hasTerm4) {
            await User.update({ agreement_sms: true }, { where: { email } });
          } else {
            console.log('term4 not found, no action taken');
          }

          if (hasTerm5) {
            await User.update({ agreement_email: true }, { where: { email } });
          } else {
            console.log('term5 not found, no action taken');
          }

          done(null, user);
        } catch (error) {
          console.error('Error during Naver authentication:', error);
          done(error);
        }
      }
    )
  );
};
