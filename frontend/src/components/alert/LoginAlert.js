import { useState } from 'react';
import { Modal, Button, Typography } from 'antd';
import Login from '../auth/Login';

const { Text } = Typography;

const LoginAlert = ({ visible, onClose }) => {
  const handleNaverLogin = () => {
    window.location.href = `http://localhost:80/auth/naver`;
  };

  const [isLoginScreen, setIsLoginScreen] = useState(false);

  const handleLoginAlertClick = () => {
    setIsLoginScreen(true);
  };

  const handleClose = () => {
    setIsLoginScreen(false);
    onClose();
  };

  return (
    <>
      {isLoginScreen ? (
        <Modal
          visible={visible}
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
        visible={!isLoginScreen && visible}
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
