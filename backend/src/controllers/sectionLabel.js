const { sequelize, SectionLabel, Spot, TagLabel, Menu } = require('../models'); // sequelize 불러오기
const { OP } = require('sequelize');

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
    // main_section_2의 ENUM 타입 값들을 가져옴
    const [enumValuesQuery] = await sequelize.query(`
        SHOW COLUMNS FROM section_label WHERE Field = 'main_section_2';
      `);

    const enumValuesString = enumValuesQuery[0].Type.match(/enum\((.*)\)/)[1];
    const mainSection2Types = enumValuesString.replace(/'/g, '').split(',');

    // 랜덤으로 하나의 main_section_2 값을 선택
    const randomIndex = Math.floor(Math.random() * mainSection2Types.length);
    const randomMainSection2 = mainSection2Types[randomIndex];

    // 영어-한글 맵핑 함수
    function mainSection2TypeMappings() {
      return {
        pork_belly: '삼겹살',
        chicken: '치킨',
        grilled_beef: '소고기구이',
        pork_libs: '돼지갈비',
        chinese_cuisine: '중국요리',
        sashimi: '회',
      };
    }

    const mappings = mainSection2TypeMappings();
    const translatedRandomMainSection2 = mappings[randomMainSection2];

    res.json(translatedRandomMainSection2);
  } catch (error) {
    console.error('Error fetching random SectionLabel:', error);
    res.status(500).json({ error: 'getRandomSectionLabel에서 랜덤 ENUM값을 가져오는 데 실패했습니다.' });
  }
};

//spot_id로 spot 테이블 join
exports.getSectionLabelList = async (req, res) => {
  try {
    const { mainSection2 } = req.query;

    console.log('check mainSection2', mainSection2); // MenuTag에서 전달된 main_section_2 값
    // 영어-한글 맵핑 함수
    function reverseMainSection2TypeMappings() {
      return {
        삼겹살: 'pork_belly',
        치킨: 'chicken',
        소고기구이: 'grilled_beef',
        돼지갈비: 'pork_libs',
        중국요리: 'chinese_cuisine',
        회: 'sashimi',
      };
    }

    //AND \`SectionLabel\`.\`main_section_2\` = '${reverseMainSection2}'
    //\`SectionLabel\`.\`spot_id\` = \`Spot\`.\`spot_id\`

    const mappings = reverseMainSection2TypeMappings();
    const reverseMainSection2 = mappings[mainSection2];
    console.log('reverseMainSection: ', reverseMainSection2);
    const sectionSpot = await SectionLabel.findAll({
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
    // 데이터가 없으면 'no data' 메시지 반환
    console.log('check sectionSpot', sectionSpot);
    if (sectionSpot === 0) {
      return res.status(404).json({ message: 'No data available' });
    }
    // 데이터가 있으면 해당 데이터를 반환
    res.json(sectionSpot);
  } catch (error) {
    res.status(500).json({ error: 'sectionSpot 데이터를 불러 올 수 없습니다.' });
  }
};
