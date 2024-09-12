import React from 'react';
import { Typography, Button, Card, Layout } from 'antd';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const ConsentPage = () => {
  const handleConfirm = () => {};

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Title level={3}>개인정보 제 3자 제공 동의</Title>
        <Card style={{ maxWidth: '600px', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
          <Paragraph style={{ textAlign: 'left' }}>
            BUCHI 서비스 내 이용자 식별, 통계, 계정 연동 및 CS 등을 위해 이용자 식별자 정보와 함께 개인정보가
            제공됩니다. 제공된 정보는 서비스 이용기간 동안 활용/보관됩니다. 본 제공 동의를 거부할 권리가 있으나, 동의를
            거부할 경우 서비스 이용이 제한될 수 있습니다.
          </Paragraph>
          <Paragraph style={{ textAlign: 'left' }}>
            <strong>1. 제공받는 자:</strong> BUCHI
          </Paragraph>
          <Paragraph style={{ textAlign: 'left' }}>
            <strong>2. 필수 제공 항목:</strong> 이용자 식별자, 휴대전화번호, 이름, 이메일 주소, 별명, 성별, 생일,
            출생연도
          </Paragraph>
          <Paragraph style={{ textAlign: 'left' }}>
            <strong>3. 선택 제공 항목:</strong> -
          </Paragraph>
          <Paragraph style={{ textAlign: 'left' }}>
            <strong>4. 제공 목적:</strong> BUCHI 서비스 내 이용자 식별, 통계, 계정 연동 및 CS처리
          </Paragraph>
          <Paragraph style={{ textAlign: 'left' }}>
            <strong>5. 보유 기간:</strong> 서비스 이용기간 동안 보관하며 동의 철회 또는 서비스 탈퇴 시 지체없이 파기
          </Paragraph>
          <Button
            type="primary"
            block
            style={{ marginTop: '24px', backgroundColor: '#2DB400', borderColor: '#2DB400' }}
            onClick={handleConfirm}
          >
            확인
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default ConsentPage;
