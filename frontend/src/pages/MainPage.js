import React from 'react';
import Filter from '../components/common/Filter';
import MenuTag from '../components/tag/MenuTag';
import VisitRankTag from '../components/tag/VisitRankTag';
import PeopleCountTag from '../components/tag/PeopleCountTag';
import FoodQuatityTag from '../components/tag/FoodQuantityTag';
import DrinkTag from '../components/tag/DrinkTag';
import GenderTag from '../components/tag/GenderTag';
import WeatherTag from '../components/tag/WeatherTag';
import TeamSpot from '../components/common/TeamSpot';
import Promotion from '../components/common/Promotion';

const MainPage = () => {
  return (
    <div style={{ width: '100%' }}>
      <Filter />
      <MenuTag /> {/* 메뉴 종류 */}
      <TeamSpot />
      <VisitRankTag />
      {/* <Promotion /> */}
      {/* <PeopleCountTag /> 4인 이하 추천 */}
      {/* <FoodQuatityTag /> 음식 양 가성비 */}
      {/* <DrinkTag /> 주류 별  */}
      {/* <GenderTag /> 성별 별 */}
      {/* <WeatherTag /> 날씨 별 */}
    </div>
  );
};

export default MainPage;
