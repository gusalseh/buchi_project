import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export const LoginPage = () => {
  const handleNaverLogin = () => {
    window.location.href = `http://localhost:80/api/auth/naver`;
  };

  return <Login onNaverLogin={handleNaverLogin} />;
};

export const RegisterPage = () => {
  const handleNaverLogin = () => {
    window.location.href = `http://localhost:80/api/auth/naver`;
  };

  return <Register onNaverLogin={handleNaverLogin} />;
};
