import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, List, DatePicker, InputNumber, Row, Col, Spin, Select, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CalendarOutlined, ClockCircleOutlined, SearchOutlined, LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

const FilterResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [selectedDate, setSelectedDate] = useState(null); // TODO: 날짜, 시간, 인원의 정보를 한꺼번에 state 관리해주는게 좋아보임
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 현재 위치 주소 받기 로딩 상태
  const [isSelectOpen, setIsSelectOpen] = useState(false); // 시간 선택 filter 열릴지 말지

  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const amount = queryParams.get('amount');
  const latitude = parseFloat(queryParams.get('lat')) || 37.5665;
  const longitude = parseFloat(queryParams.get('lng')) || 126.978;
  const address = queryParams.get('address');

  const [places, setPlaces] = useState([
    {
      title: '역삼농원',
      description: '한식-삼겹살',
      distance: '도보 5분',
      rating: 4.2,
      reviews: 123,
      price: 30000,
      lat: 37.501306,
      lng: 127.039668,
    },
    // 추가 장소 데이터를 여기에 포함
  ]);

  useEffect(() => {
    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 16,
    });

    // 작은 파란색 원
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(latitude, longitude),
      map: map,
      icon: {
        content: `
      <div style="
        width: 15px;
        height: 15px;
        background-color: #4285F4;
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      "></div>
    `,
        anchor: new window.naver.maps.Point(6, 6),
      },
    });

    // 큰 파란색 원 (주변 반경)
    new window.naver.maps.Circle({
      map: map,
      center: new window.naver.maps.LatLng(latitude, longitude),
      radius: 550,
      fillColor: '#4285F4',
      fillOpacity: 0.2,
      strokeColor: '#4285F4',
      strokeOpacity: 0.5,
      strokeWeight: 1,
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

  return (
    <div style={{ width: '100%', padding: '24px', backgroundColor: 'white' }}>
      {/* 필터 영역 */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
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
              // onClick={handleSearch}
            />
          </Col>
        </Row>
      </div>
      {/* 리스트 및 지도 영역 */}
      <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
        {/* 왼쪽 리스트 영역 */}
        <div style={{ width: '40%', paddingRight: '20px' }}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={places}
            renderItem={(place) => (
              <Card style={{ marginBottom: '20px' }}>
                <Card.Meta
                  title={place.title}
                  description={
                    <>
                      <p>{place.description}</p>
                      <p>
                        {place.distance} | 최대 12인 | 평균 {place.price}원
                      </p>
                      <p>
                        ★ {place.rating} 리뷰 {place.reviews}
                      </p>
                    </>
                  }
                />
              </Card>
            )}
          />
        </div>

        {/* 오른쪽 지도 영역 */}
        <div style={{ width: '60%' }}>
          <div
            id="map"
            style={{
              width: '100%',
              height: '600px',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FilterResultPage;
