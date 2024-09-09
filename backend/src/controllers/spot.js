const { sequelize, SectionLabel, Spot, TagLabel, Menu } = require('../models'); // sequelize 불러오기
const { OP } = require('sequelize');
const { getVisitReviewJoinDB } = require('./visit');

//spot_id로 spot 테이블 join
exports.getSpotList = async (req, res) => {
  try {
    const sectionSpotList = await SectionLabel.findAll({
      include: [
        {
          model: Spot, // Spot 테이블과 연결
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

    // 영어-한글 맵핑 함수
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

    // Visit 및 Review 데이터 불러오기
    const visitsWithReviews = await getVisitReviewJoinDB();

    // 두 데이터를 spot_id 기준으로 병합
    const mergedData = sectionSpotList.map((sectionSpot) => {
      const spotId = sectionSpot.spot_id;

      // visit + review 데이터를 해당 spot_id와 매칭
      const visitReviewData = visitsWithReviews.find((visitReview) => visitReview.spot_id === spotId);

      return {
        sectionSpot,
        visitReviewData: visitReviewData || null, // 방문 및 리뷰 데이터가 없을 수 있음
      };
    });

    // 데이터가 있으면 해당 데이터를 반환
    console.log('test mergedData', mergedData);
    res.json(mergedData);
  } catch (error) {
    res.status(500).json({ error: 'mergedData 데이터를 불러 올 수 없습니다.' });
  }
};
