import React, { useState } from 'react';
import { Modal, Button, Typography } from 'antd';
import Login from '../auth/Login'; // Login 컴포넌트 임포트

const { Text } = Typography;

const LoginAlert = ({ visible, onClose }) => {
  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:3000/auth/naver';
  };

  const [isLoginScreen, setIsLoginScreen] = useState(false); // login 화면으로 전환할 상태 관리

  //alert에서 로그인 클릭 시 login모달로 전환
  const handleLoginAlertClick = () => {
    setIsLoginScreen(true);
  };

  // 모달이 닫힐 때 isLoginScreen을 false로 초기화
  const handleClose = () => {
    setIsLoginScreen(false);
    onClose();
  };

  return (
    <>
      {isLoginScreen ? (
        <Modal
          visible={visible} // MainPage.js에서 전달된 visible 속성을 사용
          onCancel={handleClose}
          footer={null}
          closable={true}
          centered
          closeIcon={<span style={{ fontSize: '20px' }}>×</span>}
          width="fit-content"
          style={{ maxWidth: '90%' }}
          bodyStyle={{ padding: 0 }}
        >
          <Login onNaverLogin={handleNaverLogin} />
        </Modal>
      ) : null}

      <Modal
        visible={!isLoginScreen && visible} // MainPage.js에서 전달된 visible 속성을 사용하고 isLoginScreen이 false일 때만 표시
        onCancel={handleClose}
        footer={null}
        closable={true}
        centered
        closeIcon={<span style={{ fontSize: '20px' }}>×</span>}
        bodyStyle={{ textAlign: 'center', padding: '40px 20px' }}
      >
        <Text style={{ fontSize: '18px', display: 'block', marginBottom: '24px' }}>로그인이 필요한 서비스입니다.</Text>
        <Button
          type="primary"
          onClick={handleLoginAlertClick}
          style={{
            backgroundColor: '#D43114',
            borderColor: '#D43114',
            color: 'white',
            width: '100%',
            height: '48px',
            fontSize: '16px',
          }}
        >
          3초만에 로그인/회원가입 하기
        </Button>
      </Modal>
    </>
  );
};

export default LoginAlert;
