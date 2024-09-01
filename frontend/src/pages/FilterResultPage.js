import React from 'react';
import { useLocation } from 'react-router-dom';

const FilterResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const amount = queryParams.get('amount');
  const latitude = queryParams.get('lat');
  const longitude = queryParams.get('lng');

  return (
    <div>
      <h1>선택한 정보</h1>
      <p>날짜: {date}</p>
      <p>시간: {time}</p>
      <p>인원: {amount}</p>
      <p>위도: {latitude}</p>
      <p>경도: {longitude}</p>
    </div>
  );
};

export default FilterResultPage;
