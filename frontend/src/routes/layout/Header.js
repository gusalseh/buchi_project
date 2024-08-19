import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import Login from '../LoginPage';
import axios from 'axios';

export default function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 백엔드에서 사용자 정보 요청
    axios
      .get('http://localhost:3000/auth/api/user', { withCredentials: true })
      .then((response) => {
        setUser(response.data); // 로그인된 사용자 정보를 설정
      })
      .catch(() => {
        setUser(null); // 오류 발생 시 user를 null로 설정
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    axios
      .get('http://localhost:3000/auth/logout', { withCredentials: true })
      .then(() => {
        window.location.href = 'http://localhost:3001'; // 로그아웃 후 프론트엔드로 리다이렉트
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error);
      });
  };

  return (
    <div className="flex justify-between bg-base-100">
      <div className="flex p-2">
        <Link to="/">Home</Link>
      </div>
      <div className="flex items-center p-2">
        {user ? <button onClick={handleLogout}>Logout</button> : <button onClick={showModal}>Login</button>}
      </div>

      <Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Login />
      </Modal>
    </div>
  );
}
