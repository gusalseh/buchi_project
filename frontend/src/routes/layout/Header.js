import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { LoginPage, RegisterPage } from '../../pages/LoginPage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, logoutUser } from '../../features/userThunk';
import SearchInput from '../../components/common/SearchInput';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/Img/buchi_logo_full.png';

export default function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const registerShowModal = () => {
    setIsRegisterModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsRegisterModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsRegisterModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div
      style={{
        width: '100%',
        height: 112,
        display: 'flex',
        paddingTop: 24,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        backgroundColor: '#FFF',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          padding: '19.11px 340px 18.11px 340px',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{ display: 'flex', width: 1240, justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}
        >
          <div style={{ width: 248, height: 50.78, flexShrink: 0 }}>
            <Link to="/">
              <img src={logo} alt="logo" style={{ width: 248, height: 50.78 }} />
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
                  <button style={{ marginLeft: '3px', fontSize: '18px', fontWeight: 'normal', color: '#000' }}>
                    {user.nickname}
                  </button>
                </button>

                {/* 개발 편의를 위해 로그아웃 버튼 임시 추가  */}
                <button style={{ marginLeft: 20 }} onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) : (
              <div
                style={{
                  color: 'black',
                  textOverflow: 'ellipsis',
                  fontSize: 17,
                  fontWeight: '500',
                  lineHeight: '100%',
                }}
              >
                <button style={{ marginRight: 15 }} onClick={showModal}>
                  로그인
                </button>
                <button onClick={registerShowModal}>회원가입</button>
              </div>
            )}
          </div>
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
        <LoginPage />
      </Modal>
      <Modal
        title=""
        visible={isRegisterModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="fit-content"
        style={{ maxWidth: '90%' }}
        bodyStyle={{ padding: 0 }}
      >
        <RegisterPage />
      </Modal>
    </div>
  );
}
