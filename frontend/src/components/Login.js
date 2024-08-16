import React, { useState } from 'react';
import { Button, Modal, Typography, Divider } from 'antd';
// import { GoogleOutlined, FacebookOutlined, AppleOutlined } from '@ant-design/icons';
const naverIcon = `${process.env.PUBLIC_URL}/Img/naver.png`;

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); /*모달 상태 변화*/
  const handleNaverLogin = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          width: 540,
          height: 250,
          border: 'solid',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 로그인 또는 회원 가입 문구 */}
        <Typography.Title level={5} style={{ fontSize: 18, margin: '20px', textAlign: 'center' }}>
          로그인 또는 회원 가입
        </Typography.Title>

        {/* 밑줄 추가 */}
        <Divider style={{ margin: '8px 0' }} />

        <Button
          onClick={handleNaverLogin}
          icon={<img src={naverIcon} alt="Naver" style={{ width: '20px', marginRight: '10px' }} />}
          style={{
            marginLeft: '13%',
            marginTop: '10%',
            color: 'black',
            width: '400px',
            height: '60px',
            fontSize: '16px',
          }}
        >
          네이버로 로그인하기
        </Button>
        {/* 네이버 로그인 모달 */}
        <Modal title="네이버 로그인" visible={isModalVisible} onCancel={handleCancel} footer={null} width={400}>
          <iframe
            src="http://localhost:3000/naver"
            title="Naver Login"
            style={{ width: '100%', height: '500px', border: 'none' }}
          />
        </Modal>

        {/* <Button
        icon={<FacebookOutlined />}
        style={{ marginBottom: '10px', color: 'black', width: '250px', fontSize: '16px' }}
      >
        페이스북으로 로그인하기
      </Button>

      <Button
        icon={<GoogleOutlined />}
        style={{ marginBottom: '10px', color: 'black', width: '250px', fontSize: '16px' }}
      >
        구글로 로그인하기
      </Button>

      <Button
        icon={<AppleOutlined />}
        style={{ marginBottom: '10px', color: 'black', width: '250px', fontSize: '16px' }}
      >
        애플로 로그인하기
      </Button> */}
      </div>
    </div>
  );
};

export default Login;
