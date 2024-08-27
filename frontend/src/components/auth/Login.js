import React, { useState } from 'react';
import { Button, Typography, Divider } from 'antd';
import naverIcon from '../../assets/Img/naver.png';
import kakaoIcon from '../../assets/Img/kakao.png';
import googleIcon from '../../assets/Img/google.png';

const Login = ({ onNaverLogin }) => {
  const showNotImplementedAlert = () => {
    alert('구현되지 않았습니다.');
  };
  const [content, setContent] = useState('');

  return (
    <div
      style={{
        width: 558,
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <Typography.Title
        level={5}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 20,
          height: 20,
        }}
      >
        <div style={{ marginTop: 20 }}>로그인</div>
      </Typography.Title>

      <Divider style={{ margin: '8px 0' }} />
      <Button
        onClick={onNaverLogin}
        type="primary"
        style={{
          borderRadius: 0,
          backgroundColor: '#03C75A',
          borderColor: '#03C75A',
          width: 320,
          height: 60,
          marginBottom: '10px',
          fontSize: 18,
          fontStyle: 'normal',
          fontWeight: 500,
        }}
        icon={<img src={naverIcon} alt="Naver" style={{ width: '20px', marginRight: 20 }} />}
        size="large"
      >
        네이버로 로그인하기
      </Button>
      <Button
        onClick={showNotImplementedAlert}
        type="primary"
        style={{
          borderRadius: 0,
          backgroundColor: '#FEE500',
          borderColor: '#FEE500',
          width: 320,
          height: 60,
          marginBottom: '10px',
          fontSize: 18,
          fontStyle: 'normal',
          fontWeight: 500,
          color: 'black',
        }}
        icon={<img src={kakaoIcon} alt="Naver" style={{ width: '20px', marginRight: '20px' }} />}
        size="large"
      >
        카카오로 로그인하기
      </Button>
      <Button
        onClick={showNotImplementedAlert}
        type="default"
        style={{
          border: '1px solid',
          borderRadius: 0,
          width: 320,
          height: 60,
          fontSize: 18,
          fontStyle: 'normal',
          fontWeight: 500,
        }}
        size="large"
        icon={<img src={googleIcon} alt="Naver" style={{ width: '20px', marginRight: '30px' }} />}
      >
        구글로 로그인하기
      </Button>
    </div>
  );
};

export default Login;
