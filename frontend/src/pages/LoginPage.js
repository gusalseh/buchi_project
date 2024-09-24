import React from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export const LoginPage = () => {
  const handleNaverLogin = () => {
    window.location.href = `https://d6utypy1uf0r7.cloudfront.net/api/auth/naver`;
  };

  return <Login onNaverLogin={handleNaverLogin} />;
};

export const RegisterPage = () => {
  const handleNaverLogin = () => {
    window.location.href = `https://d6utypy1uf0r7.cloudfront.net/api/auth/naver`;
  };

  return <Register onNaverLogin={handleNaverLogin} />;
};
