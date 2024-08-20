import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const handleLoginClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return <div>로딩중...</div>;
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
