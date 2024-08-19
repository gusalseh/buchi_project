// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const MainPage = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   const handleLoginClick = () => {
//     navigate('/login'); // '/login' 경로로 이동
//   };

//   useEffect(() => {
//     // 백엔드에서 사용자 정보 요청
//     axios
//       .get('http://localhost:3000/auth/api/user', { withCredentials: true })
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => {
//         console.error('사용자 정보 가져오기 실패:', error);
//         setUser(null); // 오류 발생 시 user를 null로 설정
//       });
//   }, []);

//   return (
//     <div>
//       <div>부취부취</div>
//       {user ? (
//         <div>
//           <p>Email: {user.email}</p>
//           <p>Nickname: {user.nickname}</p>
//         </div>
//       ) : (
//         <button onClick={handleLoginClick} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
//           로그인
//         </button>
//       )}
//     </div>
//   );
// };

// export default MainPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  const handleLoginClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    // 사용자 정보를 백엔드에서 가져오기
    axios
      .get('http://localhost:3000/auth/api/user', { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // 401 Unauthorized 오류는 로그인되지 않은 상태이므로 에러 로그 출력하지 않음
        } else {
          setError('사용자 정보를 가져오는 데 실패했습니다.');
        }
      })
      .finally(() => {
        setLoading(false); // 로딩 상태 해제
      });
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <div>부취부취</div>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Nickname: {user.nickname}</p>
        </div>
      ) : (
        <>
          {error && <p>{error}</p>}
          <button onClick={handleLoginClick} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
            로그인
          </button>
        </>
      )}
    </div>
  );
};

export default MainPage;
