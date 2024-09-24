import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { getDistance } from '../utils/distance';
import { getRandomValet } from '../utils/randomValet';
import { Collapse, Card, Row, Col, Typography, Button, Tag, Image, Divider, message } from 'antd';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  DownOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { StarFilled } from '@ant-design/icons';
import MenuSimulation from '../components/card/MenuSimulation';
import DummyReviewCard from '../components/card/DummyReviewCard';
import pictogram from '../assets/ pictogram';
import '../styles/HeartIconComponent.css';

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
  const [visibleMenuCount, setVisibleMenuCount] = useState(4);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.user_id);
  const selectedLocation = useSelector((state) => state.userLocation.selectedLocation);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleShareClick = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        message.success('URL이 클립보드에 복사되었습니다!');
      })
      .catch((error) => {
        message.error('URL 복사에 실패했습니다.');
        console.error('복사 오류:', error);
      });
  };

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
        corkage,
        start_time,
        end_time,
        max_group_seats,
        tel,
        spot_address,
        Menus,
      },
    },
    visitReviewData: { averageRating, reviewCount },
  } = spotData;

  const translateCorkage = (corkage) => {
    switch (corkage) {
      case 'no':
        return '불가능';
      case 'free':
        return '무료';
      case 'charge':
        return '유료';
    }
  };

  const translatedCorkage = translateCorkage(corkage);

  const distance = getDistance(37.5665, 126.978, spot_lat, spot_lng); // 예시 사용자 위치 (서울)

  const handleLoadMore = () => {
    setVisibleMenuCount((prevCount) => prevCount + 4); // 4개씩 추가로 표시
  };

  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '17%',
        paddingRight: '17%',
        marginTop: 40,
      }}
    >
      <Helmet>
        <title>{spot_name} - 매장 정보</title>
        <meta name="description" content={`부장님의 취향에서 알아본! ${spot_name}`} />
        <meta property="og:title" content={spot_name} />
        <meta property="og:description" content={`${spot_name}`} />
        <meta property="og:image" content={spot_main_img} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 20 }}>
        {/* 메인 이미지 (큰 이미지) */}
        <Col xs={24} md={12}>
          <Image
            alt={spot_name}
            src={spot_main_img || '/default-image.jpg'}
            fallback="/default.png"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              aspectRatio: '1/1',
              maxWidth: 'none',
              maxHeight: 'none',
            }}
          />
        </Col>

        {/* 서브 이미지 (작은 이미지 4개) */}
        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            <Col xs={12}>
              <Image
                alt={`${spot_name} - sub 1`}
                src={spot_sub_img_1 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }}
              />
            </Col>
            <Col xs={12}>
              <Image
                alt={`${spot_name} - sub 2`}
                src={spot_sub_img_2 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            <Col xs={12}>
              <Image
                alt={`${spot_name} - sub 3`}
                src={spot_sub_img_3 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }}
              />
            </Col>
            <Col xs={12}>
              <Image
                alt={`${spot_name} - sub 4`}
                src={spot_sub_img_4 || '/default-image.jpg'}
                fallback="/default.png"
                style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        gutter={[0, 20]}
        justify="start"
        style={{ padding: 0, display: 'flex', justifyContent: 'flex-start', width: '100%' }}
      >
        {/* 왼쪽 섹션: 매장 정보 및 메뉴 상세 */}
        <Col xs={24} lg={13} style={{ padding: 0 }}>
          {/* 매장 정보 */}
          <Card bordered={false} style={{ padding: 0, boxShadow: 'none' }}>
            {/* 상단 가게 이름과 리뷰, 아이콘 */}
            <Row justify="space-between" align="middle">
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <Title
                  style={{
                    fontSize: 36,
                    fontStyle: 'normal',
                    fontWeight: 600,
                    marginBottom: 0,
                    marginRight: '8px',
                    textAlign: 'left',
                    width: 'auto',
                  }}
                >
                  {spot_name}
                </Title>
                <Text
                  type="secondary"
                  style={{ marginLeft: 8, fontSize: 17, fontStyle: 'normal', fontWeight: 500, marginTop: 5 }}
                >
                  {main_section_1}
                  {main_section_2 != null ? `· ${main_section_2}` : ' '}
                </Text>
              </div>
              <Col>
                <div className={liked ? 'heart liked' : 'heart'} onClick={toggleLike}>
                  {liked ? (
                    <HeartFilled style={{ fontSize: 28, color: '#DB5744' }} />
                  ) : (
                    <HeartOutlined style={{ fontSize: 28, color: 'black' }} />
                  )}
                </div>
                <ShareAltOutlined
                  className={'share'}
                  onClick={handleShareClick}
                  style={{ marginLeft: 10, fontSize: 28 }}
                />
              </Col>
            </Row>

            {/* 리뷰 및 평점 */}
            <Row align="middle" gutter={[8, 8]} style={{ marginTop: 8 }}>
              <Col>
                <StarFilled style={{ color: '#DB5744', fontSize: '20px' }} />
              </Col>
              <Col>
                <Text strong style={{ fontSize: '16px', marginRight: '8px' }}>
                  {averageRating}
                </Text>
                <Text type="secondary" style={{ marginLeft: 7, fontSize: '16px' }}>
                  리뷰 {reviewCount}개
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
                <Text style={{ fontSize: '17px' }}>{spot_address}</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: '16px' }}>
              <Col offset={1}>
                <Text style={{ fontSize: 17, fontStyle: 'normal', fontWeight: 500, color: '#CC3C28' }}>
                  취창업센터에서 도보 2분
                </Text>
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
                <img src={pictogram.parking} alt="주차 가능" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={pictogram.valet} alt="발렛 가능" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={pictogram.rental} alt="단체석" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={pictogram.privateRoom} alt="개인룸" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={pictogram.indoorToilet} alt="실내화장실" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={pictogram.corkage} alt="콜키지" style={{ width: '100%' }} />
              </Col>
            </Row>

            {/* 두 번째 줄 */}
            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col xs={8} sm={8} md={4}>
                <img src={pictogram.placard} alt="플랜카드" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={pictogram.wheelchair} alt="휠체어 가능" style={{ width: '100%' }} />
              </Col>
              <Col xs={8} sm={8} md={4}>
                <img src={pictogram.shoesOff} alt="신발 off" style={{ width: '100%' }} />
              </Col>
            </Row>

            {/* 하단 텍스트 */}
            <Text
              style={{
                color: '#404040',
                fontSize: 15,
                fontStyle: 'normal',
                fontWeight: 500,
                marginTop: '16px',
                textAlign: 'left',
              }}
            >
              <ul style={{ marginTop: 20, listStyleType: 'disc', color: '' }}>
                <li style={{ marginTop: 8 }}>단체석 최대 {max_group_seats}인</li>
                <li style={{ marginTop: 8 }}>발렛 요금 {getRandomValet()}원</li>
                <li style={{ marginTop: 8 }}>콜키지 {translatedCorkage}</li>
              </ul>
            </Text>
          </Card>

          <Divider />

          {/* 메뉴 상세 섹션 */}
          <Card
            title={<span style={{ fontSize: '30px', fontStyle: 'normal', fontWeight: 500 }}>메뉴 상세</span>}
            bordered={false}
            style={{
              display: 'flex',
              minWidth: 680,
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: 'none',
              marginBottom: '20px',
            }}
          >
            {Menus.slice(0, visibleMenuCount).map((menu, index) => (
              <div key={index}>
                <Row gutter={[0, 16]} align="middle" style={{ marginBottom: 20 }}>
                  <Col xs={6} style={{ padding: 0 }}>
                    <Image
                      alt={menu.menu_name}
                      src={menu.menu_img || '/default-image.jpg'}
                      width={140}
                      height={140}
                      style={{ objectFit: 'cover' }}
                      bordered={false}
                    />
                  </Col>
                  <Col xs={18} style={{ padding: 0 }}>
                    <Row
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0,
                      }}
                    >
                      {index === 0 && (
                        <Tag
                          style={{
                            fontSize: '12px',
                            border: '1px solid #DB5744',
                            borderRadius: '4px',
                            color: '#CC3C28',
                            marginRight: '8px',
                          }}
                        >
                          추천
                        </Tag>
                      )}
                      <Title
                        level={5}
                        style={{
                          fontSize: '20px',
                          fontWeight: 500,
                          margin: 0,
                        }}
                      >
                        {menu.menu_name}
                      </Title>
                    </Row>
                    <Text strong style={{ fontSize: 17, fontWeight: 500 }}>
                      {menu.price} 원
                    </Text>
                  </Col>
                </Row>
                <Divider />
              </div>
            ))}

            {visibleMenuCount < Menus.length && (
              <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '16px' }}>
                <Button
                  onClick={handleLoadMore}
                  style={{
                    bottom: 41,
                    backgroundColor: '#F2F2F2',
                    border: 'none',
                    color: '#444',
                    padding: '10px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 1,
                  }}
                >
                  <span>더보기</span>
                  <DownOutlined style={{ fontSize: '12px' }} />
                </Button>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8} style={{ marginLeft: 30 }}>
          <MenuSimulation menu={Menus} />
        </Col>
      </Row>

      <DummyReviewCard />
    </div>
  );
};

export default SpotDetailPage;
