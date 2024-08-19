import React from 'react';
import Login from '../components/Login';

const LoginPage = () => {
  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:3000/auth/naver';
  };

  return <Login onNaverLogin={handleNaverLogin} />;
};

export default LoginPage;
