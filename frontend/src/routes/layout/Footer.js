import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import logo from '../../assets/Img/buchi_logo_full.png';

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Link } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter style={{ backgroundColor: '#f0f0f0', padding: '60px 0', position: 'relative' }}>
      <div className="container mx-auto px-4">
        <Row justify="space-between">
          <Col span={8}>
            <Link href="/" style={{ display: 'block', marginBottom: '16px' }}>
              <img src={logo} alt="부취 로고" style={{ height: '32px' }} />
            </Link>
            <Title level={5} style={{ marginBottom: '8px', color: '#595959' }}>
              {' '}
              (주) 부장님의 취향{' '}
            </Title>
            <Paragraph style={{ color: '#595959', marginBottom: '8px' }}>
              상호: 주식회사 부장님의 취향 | 사업자등록번호: 000-00-000000
            </Paragraph>
            <Paragraph style={{ color: '#595959', marginBottom: '8px' }}>주소: 서울특별시 강남구 역삼로 160</Paragraph>
            <Paragraph style={{ color: '#595959', marginBottom: '8px' }}>이메일: contact@buchi.net</Paragraph>
          </Col>
          <Col span={16}>
            <Row justify="end" gutter={[32, 16]}>
              <Col>
                <Title level={5} style={{ marginBottom: '16px' }}>
                  부장님의 취향
                </Title>
                <Paragraph>
                  <Link href="#" style={{ color: '#595959' }}>
                    소개
                  </Link>
                </Paragraph>
              </Col>
              <Col>
                <Title level={5} style={{ marginBottom: '16px' }}>
                  고객센터
                </Title>
                <Paragraph>
                  <Link href="#" style={{ color: '#595959' }}>
                    공지사항
                  </Link>
                </Paragraph>
                <Paragraph>
                  <Link href="#" style={{ color: '#595959' }}>
                    자주 묻는 질문
                  </Link>
                </Paragraph>
                <Paragraph>
                  <Link href="#" style={{ color: '#595959' }}>
                    제휴 문의
                  </Link>
                </Paragraph>
              </Col>
              <Col>
                <Title level={5} style={{ marginBottom: '16px' }}>
                  서비스
                </Title>
                <Paragraph>
                  <Link href="#" style={{ color: '#595959' }}>
                    이용 약관
                  </Link>
                </Paragraph>
                <Paragraph>
                  <Link href="#" style={{ color: '#595959' }}>
                    개인정보 처리방침
                  </Link>
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, textAlign: 'center' }}>
        <Paragraph style={{ fontSize: '14px', color: '#8c8c8c' }}>
          © {currentYear} 부장님의 취향. All rights reserved.
        </Paragraph>
      </div>
    </AntFooter>
  );
};

export default Footer;
