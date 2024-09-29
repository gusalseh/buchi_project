const { sequelize } = require('../models');
const { getVisitReviewJoinDB } = require('./visit');

// 유저의 company_id로 방문 수 많은 Spot 데이터 불러오기.
exports.getUserCompanyVisitData = async (req, res) => {
  const { userCompanyId } = req.query;

  if (userCompanyId) {
    const query = `WITH ranked_spots AS (
    SELECT 
        v.spot_id,
        COUNT(v.visit_id) AS visit_count,
        COUNT(r.review_id) AS review_count,
        AVG(r.rating) AS average_rating,
        ROW_NUMBER() OVER (ORDER BY COUNT(v.visit_id) DESC) AS rn,
        c.company_name,
        c.industry_type
    FROM 
        visit v
    JOIN 
        \`user\` u ON v.user_id = u.user_id
    JOIN 
        company c ON u.company_id = c.company_id
    LEFT JOIN 
        review r ON v.visit_id = r.visit_id
    WHERE 
        u.company_id = :userCompanyId
    GROUP BY 
        v.spot_id, c.company_name, c.industry_type
)
SELECT 
    s.*, 
    rs.visit_count,
    rs.review_count,
    rs.average_rating,
    rs.company_name,
    rs.industry_type,
    cl.tag_1,
    cl.tag_2,
    cl.tag_3,
    sl.main_section_1,
    sl.main_section_2
FROM 
    ranked_spots rs
JOIN 
    spot s ON rs.spot_id = s.spot_id
LEFT JOIN 
    card_label cl ON rs.spot_id = cl.spot_id
LEFT JOIN 
    section_label sl ON rs.spot_id = sl.spot_id
WHERE 
    rs.rn <= 6
ORDER BY 
    rs.visit_count DESC;`;

    const results = await sequelize.query(query, {
      replacements: { userCompanyId: userCompanyId },
      type: sequelize.QueryTypes.SELECT,
    });

    const safeResults = Array.isArray(results) ? results : [];

    const mappings_1 = {
      service: '서비스',
      finance_banking: '금융·은행',
      IT_telecommunications: 'IT·정보통신',
      sales_distribution: '판매·유통',
      manufacturing_production_chemicals: '제조·생산·화학',
      education: '교육',
      construction: '건설',
      medical_pharmaceutical: '의료·제약',
      media_advertisement: '미디어·광고',
      cultural_art_design: '문화·예술·디자인',
      institution_association: '기관·협회',
    };

    const mappings_2 = {
      friendly: '친한사람과 함께',
      partner: '동료와 함께',
      boss: '상사와 함께',
      executive: '임원과 함께',
      vendor: '거래처와 함께',
      foreigner: '외국인과 함께',
      quiet: '조용한담소',
      chatter: '활발한수다',
      noisy: '시끌벅적한',
      casual: '캐주얼한',
      modern: '모던한',
      formal: '격식있는',
      traditional: '전통적인',
      exotic: '이국적/이색적',
    };

    const mappings_3 = {
      korean: '한식',
      chinese: '양식',
      japanese: '일식',
      western: '양식',
      asian: '아시안',
      fusion: '퓨전',
      pork_belly: '삼겹살',
      chicken: '치킨',
      grilled_beef: '소고기구이',
      pork_libs: '돼지갈비',
      chinese_cuisine: '중국요리',
      sashimi: '회',
    };

    for (i = 0; i < results.length; i++) {
      results[i].main_section_1 = mappings_3[results[i].main_section_1];
      results[i].main_section_2 = mappings_3[results[i].main_section_2];
      results[i].tag_1 = mappings_2[results[i].tag_1];
      results[i].tag_2 = mappings_2[results[i].tag_2];
      results[i].tag_3 = mappings_2[results[i].tag_3];
      results[i].industry_type = mappings_1[results[i].industry_type];
    }

    const visitsWithReviews = await getVisitReviewJoinDB();

    const visitReviewData = visitsWithReviews.find(
      (visitReview) => visitReview.spot_id === parseInt(results[0].spot_id, 10)
    );

    const mergedData = {
      safeResults,
      visitReviewData: visitReviewData || null,
    };

    res.json(mergedData);
  }
};
