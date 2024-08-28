import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import { useSelector } from 'react-redux';
import LoginAlert from '../alert/LoginAlert';

const { Text } = Typography;

const TeamSpot = () => {
  const [companyId, setCompanyId] = useState(null); // 회사 ID 상태 관리
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [isAlertVisible, setIsAlertVisible] = useState(false); //Alert 상태 관리

  const openAlert = () => {
    setIsAlertVisible(true);
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        if (user && user.user) {
          // 로그인 상태: user 객체가 null이 아니고, 빈 객체도 아닌 경우
          if (user.company_id) {
            setCompanyId(user.company_id); // 사용자에 연결된 회사 ID 설정
          } else {
            setCompanyId(null); // 회사 ID가 없는 경우
          }
        } else {
          // 비로그인 상태: user가 null이거나, 빈 객체인 경우
          setCompanyId(null); // 회사 ID를 null로 설정
        }
      } catch (error) {
        console.error('회사 ID를 가져오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [user]); // user가 변경될 때마다 useEffect 재실행

  if (isLoading) {
    return <div>Loading...</div>; // 데이터 로딩 중에 표시되는 메시지
  }

  return (
    <div style={{ padding: '24px' }}>
      {companyId ? (
        // 회사 ID가 있을 때 UI
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
        // 회사 ID가 없을 때 UI
        <div style={{ textAlign: 'center', padding: '50px 0', backgroundColor: '#fff5f5' }}>
          <Text>회사 정보를 입력하면 더욱 자세히 맞춤형 정보를 받을 수 있습니다.</Text>
          <div style={{ marginTop: '20px' }}>
            {user.user ? (
              <Button type="primary" style={{ backgroundColor: '#B22222', borderColor: '#B22222' }}>
                내 회사 정보 입력하기
              </Button>
            ) : (
              <>
                <Button
                  type="primary"
                  onClick={openAlert}
                  style={{ backgroundColor: '#B22222', borderColor: '#B22222' }}
                >
                  내 회사 정보 입력하기
                </Button>
                <LoginAlert visible={isAlertVisible} onClose={closeAlert} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSpot;
