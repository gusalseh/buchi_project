import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', nickname: '' });

  const handleLoginClick = () => {
    navigate('/login'); // '/login' 경로로 이동
  };

  useEffect(() => {
    // URL 쿼리 파라미터에서 사용자 정보 추출
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const nickname = params.get('nickname');

    // 사용자 정보를 상태에 저장
    if (email && nickname) {
      setUser({ email, nickname });
    }
  }, []);

  return (
    <div>
      <div>부취부취</div>
      {user.email && user.nickname ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Nickname: {user.nickname}</p>
        </div>
      ) : (
        <button onClick={handleLoginClick} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
          로그인
        </button>
      )}
    </div>
  );
};

export default MainPage;
