import { Button, Typography, Divider } from 'antd';
// import { GoogleOutlined, FacebookOutlined, AppleOutlined } from '@ant-design/icons';
const naverIcon = `${process.env.PUBLIC_URL}/Img/naver.png`;

const Login = ({ onNaverLogin }) => {
  return (
    <div
      style={{
        width: 540,
        height: 250,
        border: 'none',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography.Title level={5} style={{ fontSize: 18, margin: '20px', textAlign: 'center' }}>
        로그인 또는 회원 가입
      </Typography.Title>

      <Divider style={{ margin: '8px 0' }} />

      <Button
        onClick={onNaverLogin}
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
    </div>
  );
};

export default Login;
