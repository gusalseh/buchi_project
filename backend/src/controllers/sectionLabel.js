const { sequelize, SectionLabel, Spot, TagLabel, Menu } = require('../models'); // sequelize 불러오기
const { OP } = require('sequelize');
const { getVisitReviewJoinDB } = require('./visit');

exports.getSectionLabel = async (req, res) => {
  try {
    const sectionLabels = await SectionLabel.findAll();
    res.json(sectionLabels);
  } catch (error) {
    res.status(500).json({ error: 'sectionLabel을 가져오는 중 오류가 발생했습니다.' });
  }
};

// main_section_2의 값을 랜덤으로 선택하여 해당하는 SectionLabel을 조회하는 함수
exports.getRandomSectionType = async (req, res) => {
  try {
    const [enumValuesQuery] = await sequelize.query(`
        SHOW COLUMNS FROM section_label WHERE Field = 'main_section_2';
      `);
    let enumValuesString = enumValuesQuery[0].Type.match(/enum\((.*)\)/)[1];
    let enumValuesArray = enumValuesString
      .split(',')
      .map((val) => val.trim().replace(/'/g, ''))
      .filter((val) => val !== 'pork_libs');

    enumValuesString = enumValuesArray.join(',');
    const mainSection2Types = enumValuesString.replace(/'/g, '').split(',');

    const randomIndex = Math.floor(Math.random() * mainSection2Types.length);
    const randomMainSection2 = mainSection2Types[randomIndex];

    function mainSection2TypeMappings() {
      return {
        pork_belly: '삼겹살',
        chicken: '치킨',
        grilled_beef: '소고기구이',
        chinese_cuisine: '중국요리',
        sashimi: '회',
      };
    }

    const mappings = mainSection2TypeMappings();
    const translatedRandomMainSection2 = mappings[randomMainSection2];

    res.json(translatedRandomMainSection2);
  } catch (error) {
    console.error('Error fetching random SectionLabel:', error);
  }
};

//spot_id로 spot 테이블 join
exports.getSectionLabelList = async (req, res) => {
  try {
    const { mainSection2 } = req.query;

    function reverseMainSection2TypeMappings() {
      return {
        삼겹살: 'pork_belly',
        치킨: 'chicken',
        소고기구이: 'grilled_beef',
        중국요리: 'chinese_cuisine',
        회: 'sashimi',
      };
    }

    const mappings = reverseMainSection2TypeMappings();
    const reverseMainSection2 = mappings[mainSection2];
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
      where: {
        main_section_2: reverseMainSection2,
      },
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

// sub_section_1의 값을 랜덤으로 선택하여 해당하는 SectionLabel을 조회하는 함수
exports.getRandomSubSection1Type = async (req, res) => {
  try {
    const [enumValuesQuery] = await sequelize.query(`
          SHOW COLUMNS FROM section_label WHERE Field = 'sub_section_1';
        `);

    const enumValuesString = enumValuesQuery[0].Type.match(/enum\((.*)\)/)[1];
    const subSection1Types = enumValuesString.replace(/'/g, '').split(',');

    const randomIndex = Math.floor(Math.random() * subSection1Types.length);
    const randomSubSection1 = subSection1Types[randomIndex];

    const mapping = {
      small: '4인 이하 추천',
      medium: '12인 이하 추천',
      large: '13인 이상 추천',
    };

    const translatedRandomSubSection1 = mapping[randomSubSection1];

    res.json(translatedRandomSubSection1);
  } catch (error) {
    console.error('Error fetching random SectionLabel:', error);
    res.status(500).json({ error: 'getRandomSubSectionLabel에서 랜덤 ENUM값을 가져오는 데 실패했습니다.' });
  }
};

// spot_id로 spot 테이블 join
exports.getSubSection1LabelList = async (req, res) => {
  try {
    const { subSection1 } = req.query;

    // 영어-한글 맵핑 함수
    const mappings = {
      '4인 이하 추천': 'small',
      '12인 이하 추천': 'medium',
      '13인 이상 추천': 'large',
    };

    const reverseSubSection1 = mappings[subSection1];
    const subSection1SpotList = await SectionLabel.findAll({
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
      where: {
        sub_section_1: reverseSubSection1,
      },
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

    if (subSection1SpotList === 0) {
      return res.status(404).json({ message: 'No data available' });
    }

    for (i = 0; i < subSection1SpotList.length; i++) {
      subSection1SpotList[i].main_section_1 = mappings_3[subSection1SpotList[i].main_section_1];
      subSection1SpotList[i].main_section_2 = mappings_3[subSection1SpotList[i].main_section_2];
      subSection1SpotList[i].Spot.TagLabel.tag_1 = mappings_2[subSection1SpotList[i].Spot.TagLabel.tag_1];
      subSection1SpotList[i].Spot.TagLabel.tag_2 = mappings_2[subSection1SpotList[i].Spot.TagLabel.tag_2];
      subSection1SpotList[i].Spot.TagLabel.tag_3 = mappings_2[subSection1SpotList[i].Spot.TagLabel.tag_3];
    }

    const visitsWithReviews = await getVisitReviewJoinDB();

    const mergedData = subSection1SpotList.map((sectionSpot) => {
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

// sub_section_2의 값을 랜덤으로 선택하여 해당하는 SectionLabel을 조회하는 함수
exports.getRandomSubSection2Type = async (req, res) => {
  try {
    const [enumValuesQuery] = await sequelize.query(`
            SHOW COLUMNS FROM section_label WHERE Field = 'sub_section_2';
          `);

    const enumValuesString = enumValuesQuery[0].Type.match(/enum\((.*)\)/)[1];
    const subSection2Types = enumValuesString.replace(/'/g, '').split(',');

    const randomIndex = Math.floor(Math.random() * subSection2Types.length);
    const randomSubSection2 = subSection2Types[randomIndex];

    const mapping = {
      light: '가볍게 먹기 좋은',
      heavy: '푸짐한',
      effective: '가성비 좋은',
    };

    const translatedRandomSubSection2 = mapping[randomSubSection2];

    res.json(translatedRandomSubSection2);
  } catch (error) {
    console.error('Error fetching random SectionLabel:', error);
    res.status(500).json({ error: 'getRandomSubSectionLabel에서 랜덤 ENUM값을 가져오는 데 실패했습니다.' });
  }
};

// spot_id로 spot 테이블 join
exports.getSubSection2LabelList = async (req, res) => {
  try {
    const { subSection2 } = req.query;

    const mappings = {
      '가볍게 먹기 좋은': 'light',
      푸짐한: 'heavy',
      '가성비 좋은': 'effective',
    };

    const reverseSubSection2 = mappings[subSection2];
    const subSection2SpotList = await SectionLabel.findAll({
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
      where: {
        sub_section_2: reverseSubSection2,
      },
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

    if (subSection2SpotList === 0) {
      return res.status(404).json({ message: 'No data available' });
    }

    for (i = 0; i < subSection2SpotList.length; i++) {
      subSection2SpotList[i].main_section_1 = mappings_3[subSection2SpotList[i].main_section_1];
      subSection2SpotList[i].main_section_2 = mappings_3[subSection2SpotList[i].main_section_2];
      subSection2SpotList[i].Spot.TagLabel.tag_1 = mappings_2[subSection2SpotList[i].Spot.TagLabel.tag_1];
      subSection2SpotList[i].Spot.TagLabel.tag_2 = mappings_2[subSection2SpotList[i].Spot.TagLabel.tag_2];
      subSection2SpotList[i].Spot.TagLabel.tag_3 = mappings_2[subSection2SpotList[i].Spot.TagLabel.tag_3];
    }
    const visitsWithReviews = await getVisitReviewJoinDB();

    const mergedData = subSection2SpotList.map((sectionSpot) => {
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

// sub_section_3의 값을 랜덤으로 선택하여 해당하는 SectionLabel을 조회하는 함수
exports.getRandomSubSection3Type = async (req, res) => {
  try {
    const [enumValuesQuery] = await sequelize.query(`
              SHOW COLUMNS FROM section_label WHERE Field = 'sub_section_3';
            `);

    const enumValuesString = enumValuesQuery[0].Type.match(/enum\((.*)\)/)[1];
    const subSection3Types = enumValuesString.replace(/'/g, '').split(',');

    const randomIndex = Math.floor(Math.random() * subSection3Types.length);
    const randomSubSection3 = subSection3Types[randomIndex];

    const mapping = {
      korean_liquar: '전통주',
      wine: '와인',
      whisky: '위스키',
      cocktail: '칵테일',
    };

    const translatedRandomSubSection3 = mapping[randomSubSection3];

    res.json(translatedRandomSubSection3);
  } catch (error) {
    console.error('Error fetching random SectionLabel:', error);
    res.status(500).json({ error: 'getRandomSubSectionLabel3 에서 랜덤 ENUM값을 가져오는 데 실패했습니다.' });
  }
};

// spot_id로 spot 테이블 join
exports.getSubSection3LabelList = async (req, res) => {
  try {
    const { subSection3 } = req.query;

    const mappings = {
      전통주: 'korean_liquar',
      와인: 'wine',
      위스키: 'whisky',
      칵테일: 'cocktail',
    };

    const reverseSubSection3 = mappings[subSection3];
    const subSection3SpotList = await SectionLabel.findAll({
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
      where: {
        sub_section_3: reverseSubSection3,
      },
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

    if (subSection3SpotList === 0) {
      return res.status(404).json({ message: 'No data available' });
    }

    for (i = 0; i < subSection3SpotList.length; i++) {
      subSection3SpotList[i].main_section_1 = mappings_3[subSection3SpotList[i].main_section_1];
      subSection3SpotList[i].main_section_2 = mappings_3[subSection3SpotList[i].main_section_2];
      subSection3SpotList[i].Spot.TagLabel.tag_1 = mappings_2[subSection3SpotList[i].Spot.TagLabel.tag_1];
      subSection3SpotList[i].Spot.TagLabel.tag_2 = mappings_2[subSection3SpotList[i].Spot.TagLabel.tag_2];
      subSection3SpotList[i].Spot.TagLabel.tag_3 = mappings_2[subSection3SpotList[i].Spot.TagLabel.tag_3];
    }
    const visitsWithReviews = await getVisitReviewJoinDB();

    const mergedData = subSection3SpotList.map((sectionSpot) => {
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

// sub_section_4의 값을 랜덤으로 선택하여 해당하는 SectionLabel을 조회하는 함수
exports.getRandomSubSection4Type = async (req, res) => {
  try {
    const [enumValuesQuery] = await sequelize.query(`
                SHOW COLUMNS FROM section_label WHERE Field = 'sub_section_4';
              `);

    const enumValuesString = enumValuesQuery[0].Type.match(/enum\((.*)\)/)[1];
    const subSection4Types = enumValuesString.replace(/'/g, '').split(',');

    const randomIndex = Math.floor(Math.random() * subSection4Types.length);
    const randomSubSection4 = subSection4Types[randomIndex];

    const mapping = {
      both_prefer: '남녀 모두 좋아하는',
      male_prefer: '남성이 좋아하는',
      female_prefer: '여성이 좋아하는',
    };

    const translatedRandomSubSection4 = mapping[randomSubSection4];

    res.json(translatedRandomSubSection4);
  } catch (error) {
    console.error('Error fetching randomSubSection4:', error);
    res.status(500).json({ error: 'getRandomSubSectionLabel4 에서 랜덤 ENUM값을 가져오는 데 실패했습니다.' });
  }
};

// spot_id로 spot 테이블 join
exports.getSubSection4LabelList = async (req, res) => {
  try {
    const { subSection4 } = req.query;

    const mappings = {
      '남녀 모두 좋아하는': 'both_prefer',
      '남성이 좋아하는': 'male_prefer',
      '여성이 좋아하는': 'female_prefer',
    };

    const reverseSubSection4 = mappings[subSection4];
    const subSection4SpotList = await SectionLabel.findAll({
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
      where: {
        sub_section_4: reverseSubSection4,
      },
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

    if (subSection4SpotList === 0) {
      return res.status(404).json({ message: 'No data available' });
    }

    for (i = 0; i < subSection4SpotList.length; i++) {
      subSection4SpotList[i].main_section_1 = mappings_3[subSection4SpotList[i].main_section_1];
      subSection4SpotList[i].main_section_2 = mappings_3[subSection4SpotList[i].main_section_2];
      subSection4SpotList[i].Spot.TagLabel.tag_1 = mappings_2[subSection4SpotList[i].Spot.TagLabel.tag_1];
      subSection4SpotList[i].Spot.TagLabel.tag_2 = mappings_2[subSection4SpotList[i].Spot.TagLabel.tag_2];
      subSection4SpotList[i].Spot.TagLabel.tag_3 = mappings_2[subSection4SpotList[i].Spot.TagLabel.tag_3];
    }
    const visitsWithReviews = await getVisitReviewJoinDB();

    const mergedData = subSection4SpotList.map((sectionSpot) => {
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

// sub_section_5의 값을 랜덤으로 선택하여 해당하는 SectionLabel을 조회하는 함수
exports.getRandomSubSection5Type = async (req, res) => {
  try {
    const [enumValuesQuery] = await sequelize.query(`
                  SHOW COLUMNS FROM section_label WHERE Field = 'sub_section_5';
                `);

    const enumValuesString = enumValuesQuery[0].Type.match(/enum\((.*)\)/)[1];
    const subSection5Types = enumValuesString.replace(/'/g, '').split(',');

    const randomIndex = Math.floor(Math.random() * subSection5Types.length);
    const randomSubSection5 = subSection5Types[randomIndex];

    const mapping = {
      hot: '더운날',
      cold: '추운날',
      rain: '비오는날',
      snow: '눈오는날',
    };

    const translatedRandomSubSection5 = mapping[randomSubSection5];

    res.json(translatedRandomSubSection5);
  } catch (error) {
    console.error('Error fetching randomSubSection5:', error);
    res.status(500).json({ error: 'getRandomSubSectionLabel5 에서 랜덤 ENUM값을 가져오는 데 실패했습니다.' });
  }
};

// spot_id로 spot 테이블 join
exports.getSubSection5LabelList = async (req, res) => {
  try {
    const { subSection5 } = req.query;

    const mappings = {
      더운날: 'hot',
      추운날: 'cold',
      비오는날: 'rain',
      눈오는날: 'snow',
    };

    const reverseSubSection5 = mappings[subSection5];
    const subSection5SpotList = await SectionLabel.findAll({
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
      where: {
        sub_section_5: reverseSubSection5,
      },
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

    if (subSection5SpotList === 0) {
      return res.status(404).json({ message: 'No data available' });
    }

    for (i = 0; i < subSection5SpotList.length; i++) {
      subSection5SpotList[i].main_section_1 = mappings_3[subSection5SpotList[i].main_section_1];
      subSection5SpotList[i].main_section_2 = mappings_3[subSection5SpotList[i].main_section_2];
      subSection5SpotList[i].Spot.TagLabel.tag_1 = mappings_2[subSection5SpotList[i].Spot.TagLabel.tag_1];
      subSection5SpotList[i].Spot.TagLabel.tag_2 = mappings_2[subSection5SpotList[i].Spot.TagLabel.tag_2];
      subSection5SpotList[i].Spot.TagLabel.tag_3 = mappings_2[subSection5SpotList[i].Spot.TagLabel.tag_3];
    }

    const visitsWithReviews = await getVisitReviewJoinDB();

    const mergedData = subSection5SpotList.map((sectionSpot) => {
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
