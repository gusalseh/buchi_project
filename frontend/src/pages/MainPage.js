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
import MenuTagTest from '../components/tag/MenuTagTest';

const MainPage = () => {
  return (
    <div style={{ width: '100%' }}>
      <Filter />
      <MenuTag />
      <TeamSpot />
      <VisitRankTag />
      <Promotion />
      <PeopleCountTag />
      <FoodQuatityTag />
      <DrinkTag />
      <GenderTag />
      <WeatherTag />
    </div>
  );
};

export default MainPage;
