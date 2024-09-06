import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import { useSelector } from 'react-redux';
import CompanyModal from './CompanyModal';
import LoginAlert from '../alert/LoginAlert';
import CompanySpotCard from '../card/CompanySpotCard';

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
        <div style={{ height: 536, padding: '20px' }}>
          <Row style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'center' }} gutter={16}>
            {/* 왼쪽 박스 */}
            <Col style={{ width: 620 }}>
              <Text strong style={{ fontSize: '15px', fontStyle: 'normal', fontWeight: 700 }}>
                TMD 교육그룹
              </Text>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}
              >
                <Text style={{ fontSize: 36, fontStyle: 'normal', fontWeight: 300 }}>우리 회사 사원들의 회식 장소</Text>
                <Button type="link">지도로 보기</Button>
              </div>

              <CompanySpotCard />
            </Col>

            {/* 오른쪽 박스 */}
            <Col style={{ width: 620 }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}
              >
                <Text strong style={{ fontSize: '16px' }}>
                  교육
                </Text>
                <Button type="link">지도로 보기</Button>
              </div>
              <CompanySpotCard />
            </Col>
          </Row>
        </div>
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
