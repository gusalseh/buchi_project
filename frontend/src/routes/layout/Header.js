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
        display: 'inline-flex',
        paddingTop: 24,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        backgroundColor: '#FFF',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: 88,
          paddingLeft: '15%',
          paddingRight: '15%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: 248, height: 50.78, flexShrink: 0 }}>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/Img/buchi_logo_full.png`}
              alt="logo"
              style={{ width: 248, height: 50.78 }}
            />
          </Link>
        </div>
        <SearchInput
          placeholder="음식, 식당명 검색"
          style={{
            display: 'flex',
            width: '35%',
            alignItems: 'center',
            flexShrink: 0,
            borderRadius: '6px',
          }}
        />
        <div style={{ minWidth: 192, height: 24 }} className="flex">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BellOutlined style={{ width: 24, height: 24, color: '#000', fontWeight: '500' }} />
              <button style={{ marginLeft: 13 }}>
                <UserOutlined style={{ width: 24, height: 24, color: '#000', fontWeight: '500' }} />
                <span style={{ marginLeft: '3px', fontSize: '18px', fontWeight: 'normal', color: '#000' }}>
                  {user.nickname}
                </span>
              </button>

              {/* 개발 편의를 위해 로그아웃 버튼 임시 추가  */}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div
              style={{
                color: 'black',
                textOverflow: 'ellipsis',
                fontSize: 20,
                fontWeight: '500',
                lineHeight: '100%',
              }}
            >
              <button style={{ marginRight: 15 }} onClick={showModal}>
                회원가입
              </button>
              <button onClick={showModal}>로그인</button>
            </div>
          )}
        </div>
      </div>
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="fit-content"
        style={{ maxWidth: '90%' }}
        bodyStyle={{ padding: 0 }}
      >
        <Login />
      </Modal>
    </div>
  );
}
