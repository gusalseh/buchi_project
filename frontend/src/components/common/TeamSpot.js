import { useState, useEffect } from 'react';
import { Button, Row, Col, Typography } from 'antd';
import { useSelector } from 'react-redux';
import CompanyModal from './CompanyModal';
import LoginAlert from '../alert/LoginAlert';
import CompanySpotCard from '../card/CompanySpotCard';
import axios from 'axios';

const { Text } = Typography;

const TeamSpot = () => {
  const [companyId, setCompanyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [companyVisitSpotList, setCompanyVisitSpotList] = useState({});

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

  useEffect(() => {
    if (user.user && user.user.company_id) {
      const fetchUserCompanyVisitSpot = async () => {
        try {
          const companyVisitResponse = await axios.get('http://localhost:80/api/company_spot_visits', {
            params: { userId: user.user.user_id },
          });
          const companyVisitList = companyVisitResponse.data;
          setCompanyVisitSpotList(companyVisitList);
        } catch (error) {
          console.error('fetchUserCompanyVisitSpot 에서 error 발생: ', error);
        }
      };
      fetchUserCompanyVisitSpot();
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ minWidth: 1360 }}>
      {user.user && user.user.company_id && companyVisitSpotList.length > 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 80, height: 620, padding: '20px' }}>
          <Row style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'center' }} gutter={16}>
            <Col style={{ width: 620, display: 'flex', flexDirection: 'column', gap: 12, marginRight: 10 }}>
              <Text strong style={{ fontSize: '15px', fontStyle: 'normal', fontWeight: 700 }}>
                {companyVisitSpotList[0].company_name}
              </Text>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}
              >
                <Text style={{ fontSize: 36, fontStyle: 'normal', fontWeight: 300 }}>우리 회사 사원들의 회식 장소</Text>
              </div>
              {companyVisitSpotList.slice(0, 3).map((spot, index) => (
                <CompanySpotCard key={index} spotList={spot} index={index} />
              ))}
            </Col>

            <Col
              style={{
                width: 620,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                borderLeft: 'solid, #E5E5E5',
                borderLeftWidth: 1,
                paddingLeft: 20,
              }}
            >
              <Text strong style={{ fontSize: '15px', fontStyle: 'normal', fontWeight: 700 }}>
                {companyVisitSpotList[0].industry_type}
              </Text>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}
              >
                <Text style={{ fontSize: 36, fontStyle: 'normal', fontWeight: 300 }}>
                  비슷한 업종 사람들의 회식 장소
                </Text>
              </div>
              {companyVisitSpotList.slice(3, 6).map((spot, index) => (
                <CompanySpotCard key={index} spotList={spot} index={index} />
              ))}
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
