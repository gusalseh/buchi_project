import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import axios from 'axios'; // Axios를 사용하여 API 호출

const { Text } = Typography;

const TeamSpot = () => {
  const [companyId, setCompanyId] = useState(null); // 회사 ID 상태 관리
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get('/api/users/no-company');
        const user = response.data;

        if (user.length === 0) {
          // 회사 ID가 없는 경우
          setCompanyId(null);
        } else {
          // 회사 ID가 있는 경우
          setCompanyId(user[0].company_id); // user[0]은 첫 번째 사용자를 의미함. 실제 로직에서는 다르게 처리 가능
        }
      } catch (error) {
        console.error('회사 ID를 가져오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

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
            <Button type="primary" style={{ backgroundColor: '#B22222', borderColor: '#B22222' }}>
              내 회사 정보 입력하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSpot;
