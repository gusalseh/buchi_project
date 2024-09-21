export const Tag_1 = Object.freeze({
  FRIENDLY: '친한사람과 함께',
  PARTNER: '동료와 함께',
  BOSS: '상사와 함께',
  EXECUTIVE: '임원과 함께',
  VENDOR: '거래처와 함께',
  FOREIGNER: '외국인과 함께',
});

export const Tag_2 = Object.freeze({
  QUIET: '조용한담소',
  CHATTER: '활발한수다',
  NOISY: '시끌벅적한',
});

export const Tag_3 = Object.freeze({
  CASUAL: '캐주얼한',
  MODERN: '모던한',
  FORMAL: '격식있는',
  EXOTIC: '이국적·이색적',
  TRADITIONAL: '전통적인',
});

export const main_section_1 = Object.freeze({
  KOREAN: '한식',
  ASIAN: '아시안',
  WESTERN: '양식',
  JAPANESE: '일식',
  CHINESE: '중식',
  FUSION: '퓨전',
});

export const main_section_2 = Object.freeze({
  PORK_BELLY: '삼겹살',
  CHICKEN: '치킨',
  GRILLED_BEEF: '소고기구이',
  CHINESE_CUISINE: '중국요리',
  SASHIMI: '회',
});

export const sub_section_1 = Object.freeze({
  SMALL: '4인 이하 추천',
  MEDIUM: '12인 이하 추천',
  LARGE: '13인 이상 추천',
});

export const sub_section_2 = Object.freeze({
  LIGHT: '가볍게 먹기 좋은',
  EFFECTIVE: '가성비 좋은',
  HEAVY: '푸짐한',
});

export const sub_section_3 = Object.freeze({
  KOREAN_LIQUAR: '전통주',
  WHISKY: '위스키',
  COCKTAIL: '칵테일',
  WINE: '와인',
});

export const sub_section_4 = Object.freeze({
  FEMALE_PREFER: '여성이 좋아하는',
  MALE_PREFER: '남성이 좋아하는',
  BOTH_PREFER: '남녀 모두 좋아하는',
});

export const sub_section_5 = Object.freeze({
  COLD: '추운날',
  SNOW: '눈오는날',
  HOT: '더운날',
  RAIN: '비오는날',
});

export const industry_type = Object.freeze({
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
});

export const reverse_industry_type = Object.freeze({
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
});

export const getTag1 = (value) => {
  return value ? Tag_1[value.toUpperCase()] || value : '';
};

export const getTag2 = (value) => {
  return value ? Tag_2[value.toUpperCase()] || value : '';
};

export const getTag3 = (value) => {
  return value ? Tag_3[value.toUpperCase()] || value : '';
};

export const getMainsection1 = (value) => {
  return value ? main_section_1[value.toUpperCase()] || value : '';
};

export const getMainsection2 = (value) => {
  return value ? main_section_2[value.toUpperCase()] || value : '';
};

export const getSubsection1 = (value) => {
  return value ? sub_section_1[value.toUpperCase()] || value : '';
};

export const getSubsection2 = (value) => {
  return value ? sub_section_2[value.toUpperCase()] || value : '';
};

export const getSubsection3 = (value) => {
  return value ? sub_section_3[value.toUpperCase()] || value : '';
};

export const getSubsection4 = (value) => {
  return value ? sub_section_4[value.toUpperCase()] || value : '';
};

export const getSubsection5 = (value) => {
  return value ? sub_section_5[value.toUpperCase()] || value : '';
};

export const getIndustryType = (value) => {
  return industry_type[value.toUpperCase()] || value;
};

export const getReverseIndustryType = (value) => {
  return reverse_industry_type[value.toUpperCase()] || value;
};
