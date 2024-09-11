const { sequelize, User, Visit, Company, Spot } = require('../models');

// 유저의 company_id로 방문 수 많은 Spot 데이터 불러오기.
exports.getUserCompanyVisitData = async (req, res) => {
  // SELECT COUNT(b.spot_id) AS visit_count,
  // b.spot_id,
  // c.spot_name,
  // d.company_name,
  // d.industry_type
  // FROM user
  // INNER JOIN visit b ON user.user_id = b.user_id
  // INNER JOIN spot c ON b.spot_id = c.spot_id
  // INNER JOIN company d ON user.company_id = d.company_id
  // WHERE user.user_id = @USERID
  // GROUP BY b.spot_id, c.spot_name, d.company_name, d.industry_type
  // ORDER BY visit_count DESC
  // LIMIT 3;

  var query = `
    SELECT COUNT(b.spot_id) AS visit_count,
    b.spot_id,
    c.spot_name,
    d.company_name,
    d.industry_type
    FROM user
    INNER JOIN visit b ON user.user_id = b.user_id
    INNER JOIN spot c ON b.spot_id = c.spot_id
    INNER JOIN company d ON user.company_id = d.company_id
    WHERE user.user_id = @USERID
    GROUP BY b.spot_id, c.spot_name, d.company_name, d.industry_type
    ORDER BY visit_count DESC
    LIMIT 3;
    `;
  sequelize.query(query).spread(
    function (results, metadata) {
      // 쿼리 실행 성공
      console.log('results : ', results);
    },
    function (err) {
      // 쿼리 실행 에러
      console.log('err : ', err);
    }
  );
};
