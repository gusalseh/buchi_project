const cors = require('cors');

const corsOptions = {
  origin: 'https://d6utypy1uf0r7.cloudfront.net', //허용할 프론트엔드 서버 주소
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
