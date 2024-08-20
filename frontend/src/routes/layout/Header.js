import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import Login from '../LoginPage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, logoutUser } from '../../features/userSlice';
import SearchInput from '../../components/SearchInput';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

export default function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
    dispatch(logoutUser());
  };

  return (
    <div
      style={{
        width: '100%',
        marginTop: 10,
        backgroundColor: '#fff',
        padding: '0 20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <div style={{ width: 248, height: 50.55 }}>
              <img
                src={`${process.env.PUBLIC_URL}/Img/buchi_logo_full.png`}
                alt="logo"
                style={{ width: 248, height: 50.55 }}
              />
            </div>
          </Link>
        </div>
        <div style={{ width: '50%', alignContent: 'center' }}>
          <SearchInput placeholder="Search for something..." style={{ minWidth: '150px', width: '80%' }} />
        </div>
        <div style={{ minWidth: 192 }} className="flex">
          {user ? (
            <div>
              <div style={{ marginRight: 10 }}>
                <BellOutlined style={{ width: 24, height: 24 }} />
                <span>
                  <UserOutlined style={{ width: 24, height: 24 }} />
                  {user.nickname}
                </span>
              </div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={showModal}>Login</button>
          )}
        </div>
      </div>
      <Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Login />
      </Modal>
    </div>
  );
}
