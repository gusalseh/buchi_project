import React from 'react';
import { useLocation } from 'react-router-dom';

const FilterPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const amount = queryParams.get('amount');

  return (
    <div>
      <h1>선택한 정보</h1>
      <p>날짜: {date}</p>
      <p>시간: {time}</p>
      <p>인원: {amount}</p>
    </div>
  );
};

export default FilterPage;
