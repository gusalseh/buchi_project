const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', //허용할 프론트엔드 서버 주소
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
