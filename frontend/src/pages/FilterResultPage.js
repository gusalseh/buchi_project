import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, List, DatePicker, InputNumber, Row, Col, Select, Typography, Image, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CalendarOutlined, ClockCircleOutlined, SearchOutlined, StarFilled } from '@ant-design/icons';

const { Text, Title } = Typography;
const { Option } = Select;

const FilterResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const amount = queryParams.get('amount');
  const latitude = parseFloat(queryParams.get('lat')) || 37.5665;
  const longitude = parseFloat(queryParams.get('lng')) || 126.978;
  const address = queryParams.get('address');

  const [places, setPlaces] = useState([
    {
      title: '역삼농원',
      main_section_1: '한식',
      main_section_2: '삼겹살',
      distance: '5',
      max_group_seats: '10',
      rating: 4.2,
      reviews: 123,
      price: '17,000',
      lat: 37.501306,
      lng: 127.039668,
    },
    {
      title: '역삼농원',
      main_section_1: '한식',
      main_section_2: '삼겹살',
      distance: '5',
      max_group_seats: '10',
      rating: 4.2,
      reviews: 123,
      price: '17,000',
      lat: 37.509123,
      lng: 127.045123,
    },
    {
      title: '역삼농원',
      main_section_1: '한식',
      main_section_2: '삼겹살',
      distance: '5',
      max_group_seats: '10',
      rating: 4.2,
      reviews: 123,
      price: '17,000',
      lat: 37.515789,
      lng: 127.051789,
    },
    {
      title: '역삼농원',
      main_section_1: '한식',
      main_section_2: '삼겹살',
      distance: '5',
      max_group_seats: '10',
      rating: 4.2,
      reviews: 123,
      price: '17,000',
      lat: 37.507777,
      lng: 127.043777,
    },
    {
      title: '역삼농원',
      main_section_1: '한식',
      main_section_2: '삼겹살',
      distance: '5',
      max_group_seats: '10',
      rating: 4.2,
      reviews: 123,
      price: '17,000',
      lat: 37.504789,
      lng: 127.038789,
    },
    // 추가 장소 데이터를 여기에 포함
  ]);

  useEffect(() => {
    // Date는 변수 핸들링 잘해서 다시 적용해보기
    // setSelectedDate(date);
    setSelectedTime(time);
    setSelectedAmount(amount);

    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 16,
    });

    // 설정위치 빨간 원
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(latitude, longitude),
      map: map,
      icon: {
        content: `
      <div style="
        width: 15px;
        height: 15px;
        background-color: #CC3C28;
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 20px 0 rgba(204, 60, 40, 0.80);
      "></div>
    `,
        anchor: new window.naver.maps.Point(6, 6),
      },
    });

    // 주변 반경 원
    new window.naver.maps.Circle({
      map: map,
      center: new window.naver.maps.LatLng(latitude, longitude),
      radius: 550,
      fillColor: '#CC3C28',
      fillOpacity: 0.05,
      strokeColor: 'transparent',
      strokeOpacity: 0,
      strokeWeight: 0,
    });

    // 장소마다 마커 추가
    places.forEach((place) => {
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(place.lat, place.lng),
        map: map,
        title: place.title,
      });
    });
  }, [latitude, longitude, places]);

  const handleDateChange = (dateString) => {
    setSelectedDate(dateString);
    setIsSelectOpen(true);
  };

  const handleTimeChange = (value) => {
    setSelectedTime(value);
    setIsSelectOpen(false);
  };

  const buttonStyle = {
    height: 32,
    borderRadius: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 12px',
    border: '1px solid #d9d9d9',
  };

  return (
    <Col style={{ width: '100%', height: '100vh', backgroundColor: 'white' }}>
      {/* 필터 영역 */}
      <Row
        style={{
          justifyContent: 'center',
          backgroundColor: '#FAFAFA',
          borderTop: '1.5px solid #E0E0E0',
          borderBottom: '1px solid #E0E0E0',
          paddingTop: '1px',
          paddingBottom: '16px',
        }}
      >
        <Row style={{ gap: 22, justifyContent: 'center', marginTop: '16px' }}>
          <Col style={{ minWidth: 300 }}>
            <div style={{ position: 'relative', display: 'inline-block', width: '300px', margin: '0 auto' }}>
              <Button
                style={{
                  minWidth: 250,
                  width: '100%',
                  textAlign: 'center',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'row',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 300,
                  position: 'relative',
                  backgroundColor: '#FAFAFA',
                }}
              >
                <span>{address || '장소 선택'}</span>
                <DownOutlined style={{ fontSize: '15px', position: 'absolute', right: '10px' }} />
              </Button>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#B22222',
                }}
              ></div>
            </div>
          </Col>
          <Col style={{ minWidth: 240 }}>
            <DatePicker
              placeholder="날짜 선택"
              value={selectedDate}
              style={{ width: 240, height: 40 }}
              format="YYYY년 MM월 DD일"
              suffixIcon={<CalendarOutlined />}
              onChange={handleDateChange}
              allowClear={false}
            />
          </Col>
          <Col style={{ minWidth: 240 }}>
            <Select
              placeholder="저녁회식"
              style={{ width: 240, height: 40 }}
              suffixIcon={<ClockCircleOutlined style={{ fontSize: 15 }} />}
              onChange={handleTimeChange}
              value={selectedTime}
            >
              <Option value="점심회식">점심회식</Option>
              <Option value="저녁회식">저녁회식</Option>
            </Select>
          </Col>
          <Col style={{ minWidth: 240 }}>
            <InputNumber
              placeholder="3명"
              style={{
                width: 240,
                height: 40,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
              }}
              min={1}
              max={100}
              value={selectedAmount}
              onChange={setSelectedAmount}
            />
          </Col>
          <Col style={{ minWidth: 40 }}>
            <Button
              icon={<SearchOutlined style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.65)' }} />}
              style={{
                width: 40,
                height: 40,
                borderRadius: '6px',
                border: '1px solid #d9d9d9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
              }}
            />
          </Col>
        </Row>
      </Row>
      {/* 리스트 및 지도 영역 */}
      <Row
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100% - 188px)',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        {/* 왼쪽 리스트 영역 */}
        <div style={{ width: '33%', overflowY: 'auto', height: '100%' }}>
          {/* 최상단 filter 영역 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
            <div style={{ padding: '24px 0' }}>
              {/* 첫 번째 줄: 동행인, 예산, 음식, 분위기, 시설/서비스 필터 */}
              <Row gutter={[21, 21]} style={{ marginBottom: '24px' }}>
                <Col>
                  <Button style={buttonStyle}>
                    동행인 <DownOutlined />
                  </Button>
                </Col>
                <Col>
                  <Button style={buttonStyle}>
                    예산 <DownOutlined />
                  </Button>
                </Col>
                <Col>
                  <Button style={buttonStyle}>
                    음식 <DownOutlined />
                  </Button>
                </Col>
                <Col>
                  <Button style={buttonStyle}>
                    분위기 <DownOutlined />
                  </Button>
                </Col>
                <Col>
                  <Button style={buttonStyle}>
                    시설·서비스 <DownOutlined />
                  </Button>
                </Col>
              </Row>
              {/* 두 번째 줄: 왼쪽에 도보 10분 이내, 오른쪽에 거리순/리뷰순 필터 */}
              <Row justify="space-between" align="middle">
                <Col>
                  <Select defaultValue="10" style={{ width: 130, borderRadius: '6px' }}>
                    <Option value="5">도보 5분 이내</Option>
                    <Option value="10">도보 10분 이내</Option>
                    <Option value="15">도보 15분 이내</Option>
                  </Select>
                </Col>
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Button style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
                        <Text style={{ color: '#000000' }}>거리순</Text>
                      </Button>
                    </Col>
                    <Text style={{ marginTop: '4px' }}>|</Text>
                    <Col>
                      <Button style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
                        <Text style={{ color: '#B3B3B3' }}>리뷰순</Text>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
          {/* 하단 식당 카드 영역 */}
          <List
            itemLayout="vertical"
            size="large"
            dataSource={places}
            renderItem={(place) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
                <Card
                  hoverable
                  style={{
                    borderRadius: '8px',
                    border: '1px solid var(--0Gray-300, #D4D4D4)',
                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.12)',
                    marginBottom: 24,
                  }}
                  bordered={false}
                  bodyStyle={{ padding: 12 }}
                >
                  <Row gutter={16} align="middle">
                    {/* 왼쪽 텍스트 및 태그 */}
                    <Col span={16}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <Title level={4} style={{ margin: 0 }}>
                            {place.title}
                          </Title>
                          <Text type="secondary">
                            {place.main_section_1} · {place.main_section_2}
                          </Text>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <Text strong>도보 {place.distance}분</Text>
                          <Text style={{ margin: '0 8px' }}>|</Text>
                          <Text>
                            최대 <Text strong>{place.max_group_seats}인</Text>
                          </Text>
                          <Text style={{ margin: '0 8px' }}>|</Text>
                          <Text>
                            평균 <Text strong>{place.price}원</Text>
                          </Text>
                        </div>

                        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                          <Tag color="#FAE7E5" style={{ color: 'black' }}>
                            {'외국인과 함께'}
                          </Tag>
                          <Tag color="#E5F3FA" style={{ color: 'black' }}>
                            {'조용한담소'}
                          </Tag>
                          <Tag color="#F1E5FA" style={{ color: 'black' }}>
                            {'이국적/이색적'}
                          </Tag>
                        </div>

                        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center' }}>
                          <StarFilled style={{ color: '#DB5744' }} />
                          <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: 'bold' }}>{place.rating || 0}</Text>
                          <Text type="secondary" style={{ marginLeft: 8 }}>
                            리뷰 {place.reviews || 0}
                          </Text>
                        </div>
                      </div>
                    </Col>
                    {/* 오른쪽 이미지 */}
                    <Col span={8}>
                      <Image
                        src={'/default-image.jpg'}
                        fallback="/default.png"
                        preview={false}
                        bordered={false}
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
              </div>
            )}
          />
        </div>

        {/* 오른쪽 지도 영역 */}
        <div style={{ width: '67%', height: '100%' }}>
          <div
            id="map"
            style={{
              width: '100%',
              height: '100%',
            }}
          ></div>
        </div>
      </Row>
    </Col>
  );
};

export default FilterResultPage;
