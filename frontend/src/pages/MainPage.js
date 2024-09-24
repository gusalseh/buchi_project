import { Helmet } from 'react-helmet';
import Filter from '../components/common/Filter';
import MenuTag from '../components/tag/MenuTag';
import VisitRankTag from '../components/tag/VisitRankTag';
import PeopleCountTag from '../components/tag/PeopleCountTag';
import FoodQuantityTag from '../components/tag/FoodQuantityTag';
import DrinkTag from '../components/tag/DrinkTag';
import GenderTag from '../components/tag/GenderTag';
import WeatherTag from '../components/tag/WeatherTag';
import TeamSpot from '../components/common/TeamSpot';
import Promotion from '../components/common/Promotion';
import logo from '../assets/Img/buchi_logo_full.png';

const MainPage = () => {
  return (
    <div style={{ width: '99%' }}>
      <Helmet>
        <title>부장님의 취향</title>
        <meta name="description" content={'부장님의 취향'} />
        <meta property="og:title" content={'부장님의 취향'} />
        <meta property="og:description" content={'회식 장소 쉽게 찾기. 부취!'} />
        <meta property="og:image" content={logo} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <Filter />
      <MenuTag />
      <TeamSpot />
      <VisitRankTag />
      <Promotion />
      <PeopleCountTag />
      <FoodQuantityTag />
      <DrinkTag />
      <GenderTag />
      <WeatherTag />
    </div>
  );
};

export default MainPage;
