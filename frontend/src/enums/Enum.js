export const Enums = {
  Tag_1: Object.freeze({
    FRIENDLY: '친한사람과 함께',
    PARTNER: '동료와 함께',
    BOSS: '상사와 함께',
    EXECUTIVE: '임원과 함께',
    VENDOR: '거래처와 함께',
    FOREIGNER: '외국인과 함께',
  }),
  Tag_2: Object.freeze({
    QUIET: '조용한담소',
    CHATTER: '활발한수다',
    NOISY: '시끌벅적한',
  }),
  Tag_3: Object.freeze({
    CASUAL: '캐주얼한',
    MODERN: '모던한',
    FORMAL: '격식있는',
    EXOTIC: '이국적·이색적',
    TRADITIONAL: '전통적인',
  }),
  MainSection_1: Object.freeze({
    KOREAN: '한식',
    ASIAN: '아시안',
    WESTERN: '양식',
    JAPANESE: '일식',
    CHINESE: '중식',
    FUSION: '퓨전',
  }),
  MainSection_2: Object.freeze({
    PORK_BELLY: '삼겹살',
    CHICKEN: '치킨',
    GRILLED_BEEF: '소고기구이',
    CHINESE_CUISINE: '중국요리',
    SASHIMI: '회',
  }),
  SubSection_1: Object.freeze({
    SMALL: '4인 이하 추천',
    MEDIUM: '12인 이하 추천',
    LARGE: '13인 이상 추천',
  }),
  SubSection_2: Object.freeze({
    LIGHT: '가볍게 먹기 좋은',
    EFFECTIVE: '가성비 좋은',
    HEAVY: '푸짐한',
  }),
  SubSection_3: Object.freeze({
    KOREAN_LIQUAR: '전통주',
    WHISKY: '위스키',
    COCKTAIL: '칵테일',
    WINE: '와인',
  }),
  SubSection_4: Object.freeze({
    FEMALE_PREFER: '여성이 좋아하는',
    MALE_PREFER: '남성이 좋아하는',
    BOTH_PREFER: '남녀 모두 좋아하는',
  }),
  SubSection_5: Object.freeze({
    COLD: '추운날',
    SNOW: '눈오는날',
    HOT: '더운날',
    RAIN: '비오는날',
  }),
  IndustryType: Object.freeze({
    SERVICE: '서비스',
    FINANCE_BANKING: '금융·은행',
    IT_TELECOMMUNICATIONS: 'IT·정보통신',
    SALES_DISTRIBUTION: '판매·유통',
    MANUFACTURING_PRODUCTION_CHEMICALS: '제조·생산·화학',
    EDUCATION: '교육',
    CONSTRUCTION: '건설',
    MEDICAL_PHARMACEUTICAL: '의료·제약',
    MEDIA_ADVERTISEMENT: '미디어·광고',
    CULTURAL_ART_DESIGN: '문화·예술·디자인',
    INSTITUTION_ASSOCIATION: '기관·협회',
  }),
  ReverseIndustryType: Object.freeze({
    서비스: 'SERVICE',
    '금융·은행': 'FINANCE_BANKING',
    'IT·정보통신': 'IT_TELECOMMUNICATIONS',
    '판매·유통': 'SALES_DISTRIBUTION',
    '제조·생산·화학': 'MANUFACTURING_PRODUCTION_CHEMICALS',
    교육: 'EDUCATION',
    건설: 'CONSTRUCTION',
    '의료·제약': 'MEDICAL_PHARMACEUTICAL',
    '미디어·광고': 'MEDIA_ADVERTISEMENT',
    '문화·예술·디자인': 'CULTURAL_ART_DESIGN',
    '기관·협회': 'INSTITUTION_ASSOCIATION',
  }),
};

export const getValueFromEnum = (enumObj, value) => {
  return value ? enumObj[value.toUpperCase()] || value : '';
};

export const getTag1 = (value) => getValueFromEnum(Enums.Tag_1, value);
export const getTag2 = (value) => getValueFromEnum(Enums.Tag_2, value);
export const getTag3 = (value) => getValueFromEnum(Enums.Tag_3, value);

export const getMainsection1 = (value) => getValueFromEnum(Enums.MainSection_1, value);
export const getMainsection2 = (value) => getValueFromEnum(Enums.MainSection_2, value);

export const getSubsection1 = (value) => getValueFromEnum(Enums.SubSection_1, value);
export const getSubsection2 = (value) => getValueFromEnum(Enums.SubSection_2, value);
export const getSubsection3 = (value) => getValueFromEnum(Enums.SubSection_3, value);
export const getSubsection4 = (value) => getValueFromEnum(Enums.SubSection_4, value);
export const getSubsection5 = (value) => getValueFromEnum(Enums.SubSection_5, value);

export const getIndustryType = (value) => getValueFromEnum(Enums.IndustryType, value);
export const getReverseIndustryType = (value) => getValueFromEnum(Enums.ReverseIndustryType, value);
