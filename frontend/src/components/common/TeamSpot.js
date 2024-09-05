import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import { useSelector } from 'react-redux';
import CompanyModal from './CompanyModal';
import LoginAlert from '../alert/LoginAlert';

const { Text } = Typography;

const TeamSpot = () => {
  const [companyId, setCompanyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openAlert = () => {
    setIsAlertVisible(true);
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user || !user.user || !user.user.company_id) {
          setCompanyId(null);
        } else {
          setCompanyId(user.user.company_id);
        }
      } catch (error) {
        console.error('회사 ID를 가져오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.user && user.user.company_id ? (
        <Row gutter={16}>
          <Col span={12}>
            <Card title="우리 회사 사원들의 회식 장소" bordered>
              <Card type="inner" title="역삼동1" extra={<Text>회식장소</Text>}>
                <Text>평범한 장소</Text>
                <Text>별점 4.2 | 리뷰 123</Text>
              </Card>
              <Card type="inner" title="역삼동2" extra={<Text>회식장소</Text>}>
                <Text>평범한 장소</Text>
                <Text>별점 4.2 | 리뷰 123</Text>
              </Card>
              <Card type="inner" title="역삼동3" extra={<Text>회식장소</Text>}>
                <Text>평범한 장소</Text>
                <Text>별점 4.2 | 리뷰 123</Text>
              </Card>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="비슷한 업종 사람들의 회식 장소" bordered>
              <Card type="inner" title="역삼동1" extra={<Text>회식장소</Text>}>
                <Text>평범한 장소</Text>
                <Text>별점 4.2 | 리뷰 123</Text>
              </Card>
              <Card type="inner" title="역삼동2" extra={<Text>회식장소</Text>}>
                <Text>평범한 장소</Text>
                <Text>별점 4.2 | 리뷰 123</Text>
              </Card>
              <Card type="inner" title="역삼동3" extra={<Text>회식장소</Text>}>
                <Text>평범한 장소</Text>
                <Text>별점 4.2 | 리뷰 123</Text>
              </Card>
            </Card>
          </Col>
        </Row>
      ) : (
        <div style={{ width: '100%', textAlign: 'center', padding: '50px 0', backgroundColor: '#fff5f5' }}>
          <Text>회사 정보를 입력하면 더욱 자세히 맞춤형 정보를 받을 수 있습니다.</Text>
          {user.user ? (
            <div style={{ marginTop: '20px' }}>
              <Button type="primary" onClick={openModal} style={{ backgroundColor: '#B22222', borderColor: '#B22222' }}>
                내 회사 정보 입력하기
              </Button>
              <CompanyModal visible={isModalVisible} onClose={closeModal} />
            </div>
          ) : (
            <div style={{ marginTop: '20px' }}>
              <Button type="primary" onClick={openAlert} style={{ backgroundColor: '#B22222', borderColor: '#B22222' }}>
                내 회사 정보 입력하기
              </Button>
              <LoginAlert visible={isAlertVisible} onClose={closeAlert} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamSpot;
