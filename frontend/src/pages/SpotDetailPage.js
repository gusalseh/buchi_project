import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getDistance } from '../utils/distance';
import { Collapse, Card, Row, Col, Typography, Rate, Button, Tag, Image, Divider, InputNumber } from 'antd';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  CarOutlined,
  CreditCardOutlined,
  HeartOutlined,
  ShareAltOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { StarFilled } from '@ant-design/icons';

const { Panel } = Collapse;
const { Title, Text } = Typography;

const isOpen = (start_time, end_time) => {
  if (!start_time || !end_time) return false;

  const now = new Date(); // 현재 시간
  const [currentHours, currentMinutes] = [now.getHours(), now.getMinutes()];

  // start_time과 end_time을 'hh:mm' 형식에서 Date 객체로 변환
  const [startHours, startMinutes] = start_time.split(':').map(Number);
  const [endHours, endMinutes] = end_time.split(':').map(Number);

  const start = new Date();
  start.setHours(startHours, startMinutes, 0, 0); // 영업 시작 시간 설정

  const end = new Date();
  end.setHours(endHours, endMinutes, 0, 0); // 영업 종료 시간 설정

  // 현재 시간이 start_time과 end_time 사이에 있는지 확인
  return now >= start && now <= end;
};

const SpotDetailPage = () => {
  const { id } = useParams();
  const [spotData, setSpotData] = useState(null);

  useEffect(() => {
    const fetchSpotData = async () => {
      try {
        const response = await axios.get(`http://localhost:80/api/spots/spotlistById/${id}`);
        setSpotData(response.data);
      } catch (error) {
        console.error('식당 데이터를 가져오는데 실패했습니다:', error);
      }
    };

    fetchSpotData();
  }, [id]);

  if (!spotData) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const {
    sectionSpot: {
      main_section_1,
      main_section_2,
      Spot: {
        spot_name,
        spot_main_img,
        spot_sub_img_1,
        spot_sub_img_2,
        spot_sub_img_3,
        spot_sub_img_4,
        spot_lat,
        spot_lng,
        start_time,
        end_time,
        max_group_seats,
        tel,
        spot_address,
        TagLabel,
        Menus,
        promotion,
        news,
      },
    },
  } = spotData;

  const distance = getDistance(37.5665, 126.978, spot_lat, spot_lng); // 예시 사용자 위치 (서울)

  return (
    <div style={{ padding: '20px 100px' }}>
      {/* 이미지 영역 */}
      <Row gutter={[16, 16]} justify="start" style={{ marginBottom: 20 }}>
        {/* 메인 이미지 (큰 이미지) */}
        <Col span={12}>
          <Image
            alt={spot_name}
            src={spot_main_img || '/default-image.jpg'}
            fallback="/default.png"
            style={{ width: '620px', height: '612px', objectFit: 'cover' }}
          />
        </Col>

        {/* 서브 이미지 (작은 이미지 4개) */}
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Image
                alt={`${spot_name} - sub 1`}
                src={spot_sub_img_1 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '295px', height: '295px', objectFit: 'cover' }}
              />
            </Col>
            <Col span={12}>
              <Image
                alt={`${spot_name} - sub 2`}
                src={spot_sub_img_2 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '295px', height: '295px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            <Col span={12}>
              <Image
                alt={`${spot_name} - sub 3`}
                src={spot_sub_img_3 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '295px', height: '295px', objectFit: 'cover' }}
              />
            </Col>
            <Col span={12}>
              <Image
                alt={`${spot_name} - sub 4`}
                src={spot_sub_img_4 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '295px', height: '295px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[32, 32]}>
        {/* 왼쪽 섹션: 매장 정보 및 메뉴 상세 */}
        <Col span={16}>
          {/* 매장 정보 */}
          <Card bordered={false} style={{ boxShadow: 'none' }}>
            {/* 상단 가게 이름과 리뷰, 아이콘 */}
            <Row justify="space-between" align="middle">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Title level={2} style={{ marginBottom: 0, marginRight: '8px' }}>
                  {spot_name}
                </Title>
                <Text type="secondary" style={{ marginTop: 5 }}>
                  {main_section_1}
                  {main_section_2 != null ? `· ${main_section_2}` : ' '}
                </Text>
              </div>
              <Col>
                <HeartOutlined style={{ fontSize: '20px', marginRight: '16px' }} />
                <ShareAltOutlined style={{ fontSize: '20px' }} />
              </Col>
            </Row>

            {/* 리뷰 및 평점 */}
            <Row align="middle" gutter={[8, 8]}>
              <Col>
                {/* 커스텀 별 아이콘 */}
                <StarFilled style={{ color: '#DB5744', fontSize: '20px', marginRight: '8px' }} />
              </Col>
              <Col>
                <Text strong style={{ fontSize: '16px', marginRight: '8px' }}>
                  4.2
                </Text>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  리뷰 123
                </Text>
              </Col>
            </Row>

            <Divider />

            {/* 주소 및 취창업센터 거리 */}
            <Row align="middle" style={{ marginBottom: '8px' }}>
              <Col>
                <EnvironmentOutlined style={{ fontSize: '18px', marginRight: '8px' }} />
              </Col>
              <Col>
                <Text style={{ fontSize: '16px' }}>{spot_address}</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: '16px' }}>
              <Col offset={1}>
                <Text style={{ fontSize: '16px', color: 'red' }}>취창업센터에서 도보 2분</Text>
              </Col>
            </Row>

            {/* 영업시간 */}
            {start_time && end_time ? (
              <>
                <Row align="middle" style={{ marginBottom: '8px' }}>
                  <Col>
                    <ClockCircleOutlined style={{ fontSize: '18px', marginRight: '8px' }} />
                  </Col>
                  <Col>
                    {isOpen(start_time, end_time) ? (
                      <Text style={{ fontSize: '16px', fontWeight: 'bold', color: 'green' }}>영업중</Text>
                    ) : (
                      <Text style={{ fontSize: '16px', fontWeight: 'bold', color: 'red' }}>영업 종료</Text>
                    )}
                    <Text type="secondary" style={{ marginLeft: '8px', fontSize: '16px' }}>
                      {end_time}에 영업 종료
                    </Text>
                  </Col>
                </Row>
              </>
            ) : (
              <></>
            )}

            {/* 전화번호 */}
            <Row align="middle">
              <Col>
                <PhoneOutlined style={{ fontSize: '18px', marginRight: '8px' }} />
              </Col>
              <Col>
                <Text style={{ fontSize: '16px' }}>{tel}</Text>
              </Col>
            </Row>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col span={4}>
                <Button icon={<CarOutlined />} type="primary">
                  주차 가능
                </Button>
              </Col>
              <Col span={4}>
                <Button icon={<CarOutlined />} type="primary">
                  발렛 가능
                </Button>
              </Col>
              <Col span={4}>
                <Button icon={<CreditCardOutlined />} type="primary">
                  현금/카드
                </Button>
              </Col>
            </Row>
            <Text>단체석 최대 55인, 발렛 요금 3,000원, 콜키지 무료</Text>
          </Card>

          <Divider />

          {/* 메뉴 상세 */}
          <Card title="메뉴 상세" bordered={false} style={{ boxShadow: 'none' }}>
            <Row gutter={[16, 16]}>
              <Col span={4}>
                <Image alt="모둠한판" src="/default-image.jpg" width={80} height={80} style={{ objectFit: 'cover' }} />
              </Col>
              <Col span={20}>
                <Row justify="space-between" align="middle">
                  <Title level={5}>모둠한판(500g)</Title>
                  <Tag color="red">추천</Tag>
                </Row>
                <Text>삼겹살, 고등살, 갈매기살</Text>
                <br />
                <Text>45,000 원</Text>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={4}>
                <Image
                  alt="한돈 생삼겹살"
                  src="/default-image.jpg"
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover' }}
                />
              </Col>
              <Col span={20}>
                <Title level={5}>한돈 생삼겹살(160g)</Title>
                <Text>400시간 숙성한 도드람 한돈 생삼겹살</Text>
                <br />
                <Text>45,000 원</Text>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={4}>
                <Image
                  alt="한돈 꼬들살"
                  src="/default-image.jpg"
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover' }}
                />
              </Col>
              <Col span={20}>
                <Title level={5}>한돈 꼬들살(160g)</Title>
                <Text>15,000 원</Text>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={4}>
                <Image alt="갈매기살" src="/default-image.jpg" width={80} height={80} style={{ objectFit: 'cover' }} />
              </Col>
              <Col span={20}>
                <Title level={5}>갈매기살(150g)</Title>
                <Text>16,000 원</Text>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 오른쪽 섹션: 주문 및 예약 */}
        <Col span={8}>
          <Card title="메뉴" bordered={false} style={{ boxShadow: 'none' }}>
            <Collapse defaultActiveKey={['1']}>
              <Panel header="메인" key="1">
                <Text>모둠한판(500g)</Text>
                <InputNumber min={1} max={10} defaultValue={1} style={{ marginLeft: '16px' }} />
                <Text style={{ float: 'right' }}>45,000 원</Text>
                <Divider />
                <Text>한돈 생삼겹살(160g)</Text>
                <InputNumber min={1} max={10} defaultValue={2} style={{ marginLeft: '16px' }} />
                <Text style={{ float: 'right' }}>30,000 원</Text>
              </Panel>
              <Panel header="사이드" key="2">
                <Text>사이드 메뉴 선택</Text>
              </Panel>
              <Panel header="음료/주류" key="3">
                <Text>음료 선택</Text>
              </Panel>
            </Collapse>

            <Divider />

            <Row justify="space-between">
              <Text>총 주문 금액</Text>
              <Text>75,000 원</Text>
            </Row>

            <Button type="primary" block style={{ marginTop: '16px' }}>
              식당가기
            </Button>
            <Button type="default" block style={{ marginTop: '8px' }}>
              바로 예약하기
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SpotDetailPage;
