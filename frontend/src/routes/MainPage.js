import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLoginClick = () => {
    navigate('/login'); // '/login' 경로로 이동
  };

  useEffect(() => {
    // 백엔드에서 사용자 정보 요청
    axios
      .get('http://localhost:3000/auth/api/user', { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('사용자 정보 가져오기 실패:', error);
        setUser(null); // 오류 발생 시 user를 null로 설정
      });
  }, []);

  return (
    <div>
      <div>부취부취</div>
      {user ? (
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
