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
import Image1 from '../assets/Img/spotdetailpicto/pictoX2/parking.png';
import Image2 from '../assets/Img/spotdetailpicto/pictoX2/valet.png';
import Image3 from '../assets/Img/spotdetailpicto/pictoX2/rental.png';
import Image4 from '../assets/Img/spotdetailpicto/pictoX2/private_room.png';
import Image5 from '../assets/Img/spotdetailpicto/pictoX2/indoor_toilet.png';
import Image6 from '../assets/Img/spotdetailpicto/pictoX2/corkage.png';
import Image7 from '../assets/Img/spotdetailpicto/pictoX2/placard.png';
import Image8 from '../assets/Img/spotdetailpicto/pictoX2/wheelchair.png';
import Image9 from '../assets/Img/spotdetailpicto/pictoX2/shoesoff.png';

const { Panel } = Collapse;
const { Title, Text } = Typography;

const isOpen = (start_time, end_time) => {
  if (!start_time || !end_time) return false;

  const now = new Date();
  const [startHours, startMinutes] = start_time.split(':').map(Number);
  const [endHours, endMinutes] = end_time.split(':').map(Number);

  const start = new Date();
  start.setHours(startHours, startMinutes, 0, 0);

  const end = new Date();
  end.setHours(endHours, endMinutes, 0, 0);

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
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        maxWidth: 1920,
        padding: '20px 16px',
      }}
    >
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 20, width: '100%', height: 'auto' }}>
        {/* 메인 이미지 (큰 이미지) */}
        <Col xs={24} md={12}>
          <Image
            alt={spot_name}
            src={spot_main_img || '/default-image.jpg'}
            fallback="/default.png"
            style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
            preview={false}
          />
        </Col>

        {/* 서브 이미지 (작은 이미지 4개) */}
        <Col xs={24} md={12}>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={12}>
              <Image
                alt={`${spot_name} - sub 1`}
                src={spot_sub_img_1 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
                preview={false}
              />
            </Col>
            <Col xs={12}>
              <Image
                alt={`${spot_name} - sub 2`}
                src={spot_sub_img_2 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
                preview={false}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '16px' }} justify="center">
            <Col xs={12}>
              <Image
                alt={`${spot_name} - sub 3`}
                src={spot_sub_img_3 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
                preview={false}
              />
            </Col>
            <Col xs={12}>
              <Image
                alt={`${spot_name} - sub 4`}
                src={spot_sub_img_4 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
                preview={false}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={[32, 32]} justify="center" style={{ width: '100%' }}>
        {/* 왼쪽 섹션: 매장 정보 및 메뉴 상세 */}
        <Col xs={24} lg={16}>
          {/* 매장 정보 */}
          <Card bordered={false} style={{ boxShadow: 'none' }}>
            {/* 상단 가게 이름과 리뷰, 아이콘 */}
            <Row justify="space-between" align="middle">
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Title level={2} style={{ marginBottom: 0, marginRight: '8px', textAlign: 'center', width: 'auto' }}>
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
            {start_time && end_time && (
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

            {/* 픽토그램 그리드 */}
            <Row gutter={[16, 16]}>
              <Col xs={8} sm={8} md={4}>
                <img src={Image1} alt="주차 가능" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={Image2} alt="발렛 가능" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={Image3} alt="단체석" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={Image4} alt="개인룸" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={Image5} alt="실내화장실" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={Image6} alt="콜키지" style={{ width: '100%' }} />
              </Col>
            </Row>

            {/* 두 번째 줄 */}
            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col xs={8} sm={8} md={4}>
                <img src={Image7} alt="플랜카드" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={Image8} alt="휠체어 가능" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={Image9} alt="신발 off" style={{ width: '100%' }} />
              </Col>
            </Row>

            {/* 하단 텍스트 */}
            <Text style={{ marginTop: '16px', textAlign: 'left' }}>
              <ul style={{ marginTop: 20, listStyleType: 'disc', color: '' }}>
                <li style={{ marginTop: 5 }}>단체석 최대 {max_group_seats}인</li>
                <li style={{ marginTop: 5 }}>발렛 요금 3,000원</li>
                <li style={{ marginTop: 5 }}>콜키지 무료</li>
              </ul>
            </Text>
          </Card>

          <Divider />

          {/* 메뉴 상세 */}
          <Card title="메뉴 상세" bordered={false} style={{ boxShadow: 'none' }}>
            {/* 모둠한판(500g) */}
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={4}>
                <Image
                  alt="모둠한판"
                  src="/default-image.jpg"
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                  preview={false}
                />
              </Col>
              <Col xs={24} sm={20}>
                <Row justify="space-between" align="middle">
                  <Title level={5} style={{ margin: 0 }}>
                    모둠한판(500g)
                  </Title>
                  <Tag color="red" style={{ fontSize: '12px' }}>
                    추천
                  </Tag>
                </Row>
                <Text type="secondary">삼겹살, 고등살, 갈매기살</Text>
                <br />
                <Text strong style={{ fontSize: '16px' }}>
                  45,000 원
                </Text>
              </Col>
            </Row>

            <Divider />

            {/* 한돈 생삼겹살(160g) */}
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={4}>
                <Image
                  alt="한돈 생삼겹살"
                  src="/default-image.jpg"
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                  preview={false}
                />
              </Col>
              <Col xs={24} sm={20}>
                <Title level={5} style={{ margin: 0 }}>
                  한돈 생삼겹살(160g)
                </Title>
                <Text type="secondary">400시간 숙성한 도드람 한돈 생삼겹살</Text>
                <br />
                <Text strong style={{ fontSize: '16px' }}>
                  45,000 원
                </Text>
              </Col>
            </Row>

            <Divider />

            {/* 한돈 꼬들살(160g) */}
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={4}>
                <Image
                  alt="한돈 꼬들살"
                  src="/default-image.jpg"
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                  preview={false}
                />
              </Col>
              <Col xs={24} sm={20}>
                <Title level={5} style={{ margin: 0 }}>
                  한돈 꼬들살(160g)
                </Title>
                <Text strong style={{ fontSize: '16px' }}>
                  15,000 원
                </Text>
              </Col>
            </Row>

            <Divider />

            {/* 갈매기살(150g) */}
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={4}>
                <Image
                  alt="갈매기살"
                  src="/default-image.jpg"
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                  preview={false}
                />
              </Col>
              <Col xs={24} sm={20}>
                <Title level={5} style={{ margin: 0 }}>
                  갈매기살(150g)
                </Title>
                <Text strong style={{ fontSize: '16px' }}>
                  16,000 원
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 오른쪽 섹션: 주문 및 예약 */}
        <Col xs={24} lg={8}>
          <Card title="메뉴" bordered={false} style={{ boxShadow: 'none', borderRadius: '8px' }}>
            <Collapse defaultActiveKey={['1']} accordion>
              <Panel header="메인" key="1">
                <div
                  style={{
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Text strong>모둠한판(500g)</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <InputNumber min={1} max={10} defaultValue={1} style={{ width: '60px', marginRight: '8px' }} />
                    <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>45,000 원</Text>
                  </div>
                </div>
                <Divider />
                <div
                  style={{
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Text strong>한돈 생삼겹살(160g)</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <InputNumber min={1} max={10} defaultValue={2} style={{ width: '60px', marginRight: '8px' }} />
                    <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>30,000 원</Text>
                  </div>
                </div>
              </Panel>
              <Panel header="사이드" key="2">
                <Text>사이드 메뉴 선택</Text>
              </Panel>
              <Panel header="음료/주류" key="3">
                <Text>음료 선택</Text>
              </Panel>
            </Collapse>

            <Divider />

            <Row justify="space-between" style={{ marginBottom: '16px' }}>
              <Text strong>총 주문 금액</Text>
              <Text strong style={{ fontSize: '16px', fontWeight: 'bold', color: '#DB5744' }}>
                75,000 원
              </Text>
            </Row>

            <Button
              type="default"
              block
              style={{
                marginTop: '16px',
                backgroundColor: '#F3F3F3',
                color: '#DB5744',
                borderColor: '#DB5744',
                height: '48px',
                fontWeight: 'bold',
              }}
            >
              식당가기
            </Button>
            <Button
              type="primary"
              block
              style={{
                marginTop: '8px',
                backgroundColor: '#DB5744',
                borderColor: '#DB5744',
                height: '48px',
                fontWeight: 'bold',
              }}
            >
              바로 예약하기
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SpotDetailPage;
