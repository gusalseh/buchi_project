import React from 'react';
import Login from '../components/auth/Login';

const LoginPage = () => {
  const handleNaverLogin = () => {
    window.location.href = `http://localhost:${BACKEND_PORT}/auth/naver`;
  };

  return <Login onNaverLogin={handleNaverLogin} />;
};

export default LoginPage;
