import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    const success = await login(email, password);
    if (!success) {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-md" style={{ width: 650, height: 444, border: '2px solid #d9d9d9' }}>
        <Form onFinish={handleSubmit}>
          <div className="flex items-start" style={{ height: 140, marginLeft: 15, marginTop: 50 }}>
            <div className="flex flex-col justify-start gap">
              <Form.Item style={{ marginBottom: 8 }}>
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="아이디"
                  style={{ width: 400, height: 62, fontSize: 19 }}
                />
              </Form.Item>

              <Form.Item>
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  style={{ width: 400, height: 62, fontSize: 19 }}
                />
              </Form.Item>
            </div>

            <Form.Item style={{ marginLeft: 8 }}>
              <Button type="primary" htmlType="submit" style={{ width: 141, height: 136, fontSize: 20 }}>
                로그인
              </Button>
            </Form.Item>
          </div>

          {error && <div style={{ height: 18, marginLeft: 5, color: 'red', fontSize: 16 }}>{error}</div>}

          <Form.Item style={{ marginTop: 20, marginBottom: 16 }}>
            <Checkbox>로그인 유지</Checkbox>
          </Form.Item>
        </Form>

        <Divider />

        <div className="flex justify-center space-x-10 text-xs text-gray-600 mt-4">
          <a href="#" style={{ fontSize: 18 }}>
            아이디찾기
          </a>
          <a href="#" style={{ fontSize: 18 }}>
            비밀번호찾기
          </a>
          <a href="#" style={{ fontSize: 18, fontWeight: 'bold' }}>
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
