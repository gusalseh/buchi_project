import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/user', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Fetch User Error:', error);
      }
    };

    fetchUser();
  }, []);

  const register = async (email, password, name, nick, birth, sex, company_name, company_branch) => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, nick, birth, sex, company_name, company_branch }),
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration Error: ', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setCurrentUser(userData);
        return true; // 로그인 성공시 true 반환
      } else {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Login Error: ', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setCurrentUser(null);
      } else {
        throw new Error('Logout Error');
      }
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
