import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // '/login' 경로로 이동
  };

  return (
    <div>
      <div>부취부취</div>
      <button onClick={handleLoginClick} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        로그인
      </button>
    </div>
  );
};

export default MainPage;
