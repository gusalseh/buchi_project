const { sequelize, SectionLabel, Spot, TagLabel, Menu } = require('../models'); // sequelize 불러오기
const { OP } = require('sequelize');
const { getVisitReviewJoinDB } = require('./visit');

//spot_id로 spot 테이블 join
exports.getSpotList = async (req, res) => {
  try {
    const sectionSpotList = await SectionLabel.findAll({
      include: [
        {
          model: Spot,
          include: [
            {
              model: TagLabel,
            },
            {
              model: Menu,
            },
          ],
        },
      ],
      limit: 10,
    });

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

    if (sectionSpotList === 0) {
      return res.status(404).json({ message: 'No data available' });
    }

    for (i = 0; i < sectionSpotList.length; i++) {
      sectionSpotList[i].main_section_1 = mappings_3[sectionSpotList[i].main_section_1];
      sectionSpotList[i].main_section_2 = mappings_3[sectionSpotList[i].main_section_2];
      sectionSpotList[i].Spot.TagLabel.tag_1 = mappings_2[sectionSpotList[i].Spot.TagLabel.tag_1];
      sectionSpotList[i].Spot.TagLabel.tag_2 = mappings_2[sectionSpotList[i].Spot.TagLabel.tag_2];
      sectionSpotList[i].Spot.TagLabel.tag_3 = mappings_2[sectionSpotList[i].Spot.TagLabel.tag_3];
    }

    const visitsWithReviews = await getVisitReviewJoinDB();

    const mergedData = sectionSpotList.map((sectionSpot) => {
      const spotId = sectionSpot.spot_id;

      const visitReviewData = visitsWithReviews.find((visitReview) => visitReview.spot_id === spotId);

      return {
        sectionSpot,
        visitReviewData: visitReviewData || null,
      };
    });

    res.json(mergedData);
  } catch (error) {
    res.status(500).json({ error: 'mergedData 데이터를 불러 올 수 없습니다.' });
  }
};

exports.getSpotById = async (req, res) => {
  const { spot_id } = req.params;

  try {
    const sectionSpot = await SectionLabel.findOne({
      where: {
        spot_id,
      },
      include: [
        {
          model: Spot,
          include: [
            {
              model: TagLabel,
            },
            {
              model: Menu,
            },
          ],
        },
      ],
    });

    if (!sectionSpot) {
      return res.status(404).json({ message: 'Spot not found' });
    }

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

    sectionSpot.main_section_1 = mappings_3[sectionSpot.main_section_1];
    sectionSpot.main_section_2 = mappings_3[sectionSpot.main_section_2];
    sectionSpot.Spot.TagLabel.tag_1 = mappings_2[sectionSpot.Spot.TagLabel.tag_1];
    sectionSpot.Spot.TagLabel.tag_2 = mappings_2[sectionSpot.Spot.TagLabel.tag_2];
    sectionSpot.Spot.TagLabel.tag_3 = mappings_2[sectionSpot.Spot.TagLabel.tag_3];

    const visitsWithReviews = await getVisitReviewJoinDB();

    const visitReviewData = visitsWithReviews.find((visitReview) => visitReview.spot_id === parseInt(spot_id, 10));

    const mergedData = {
      sectionSpot,
      visitReviewData: visitReviewData || null,
    };

    res.json(mergedData);
  } catch (error) {
    console.error('Error fetching spot data:', error);
    res.status(500).json({ error: 'Spot 데이터를 불러올 수 없습니다.' });
  }
};

exports.getSpotByDist = async (req, res) => {
  const { latitude, longitude, amount } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: '위도와 경도를 제공해야 합니다.' });
  }

  try {
    const query = `
      SELECT
          s.*,
          ST_Distance_Sphere(
              POINT(s.spot_lng, s.spot_lat),
              POINT(:longitude, :latitude)
          ) AS distance,
          ANY_VALUE(cl.tag_1) AS tag_1,
          ANY_VALUE(cl.tag_2) AS tag_2,
          ANY_VALUE(cl.tag_3) AS tag_3,
          ANY_VALUE(sl.main_section_1) AS mainSec_1,
          ANY_VALUE(sl.main_section_2) AS mainSec_2,
          ANY_VALUE(sl.sub_section_1) AS subSec_1,
          ANY_VALUE(sl.sub_section_2) AS subSec_2,
          ANY_VALUE(sl.sub_section_3) AS subSec_3,
          ANY_VALUE(sl.sub_section_4) AS subSec_4,
          ANY_VALUE(sl.sub_section_5) AS subSec_5,
          s.private_room,
          s.parking_lot,
          s.valet,
          s.corkage,
          s.rental,
          s.placard,
          s.indoor_toilet,
          s.wheelchair,
          AVG(m.price) AS avg_price,
          AVG(r.rating) AS avg_rating,
          COUNT(DISTINCT r.review_id) AS review_count
      FROM spot s
      LEFT JOIN card_label cl ON s.spot_id = cl.spot_id
      LEFT JOIN section_label sl ON s.spot_id = sl.spot_id
      LEFT JOIN menu m ON s.spot_id = m.spot_id AND m.menu_type = 'maindish'
      LEFT JOIN visit v ON s.spot_id = v.spot_id
      LEFT JOIN review r ON v.visit_id = r.visit_id
      WHERE ST_Distance_Sphere(
          POINT(s.spot_lng, s.spot_lat),
          POINT(:longitude, :latitude)
      ) <= 700
      GROUP BY s.spot_id
      ORDER BY distance ASC
    `;

    const spots = await sequelize.query(query, {
      replacements: { latitude, longitude },
      type: sequelize.QueryTypes.SELECT,
    });

    const updatedSpots = spots
      .filter((spot) => spot.max_group_seats >= amount)
      .map((spot) => {
        const walkingTime = Math.round(spot.distance / 70);
        return {
          ...spot,
          walking_time: walkingTime,
        };
      });

    return res.json(updatedSpots);
  } catch (error) {
    console.error('쿼리 실행 중 오류:', error);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
};
