import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, List, DatePicker, InputNumber, Row, Col, Select, Typography, Image, Tag, Slider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CalendarOutlined, ClockCircleOutlined, SearchOutlined, StarFilled, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

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
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedRange, setSelectedRange] = useState([10000, 400000]);
  const [selectedDetailFilter, setSelectedDetailFilter] = useState(null);
  const [places, setPlaces] = useState([]);
  const [hoveredPlace, setHoveredPlace] = useState(null);

  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const amount = queryParams.get('amount');
  const latitude = parseFloat(queryParams.get('lat')) || 37.5665;
  const longitude = parseFloat(queryParams.get('lng')) || 126.978;
  const address = queryParams.get('address');

  useEffect(() => {
    const fetchPlacesByDistance = async () => {
      try {
        const currentPosition = {
          latitude: latitude,
          longitude: longitude,
        };
        const response = await axios.post('http://localhost:80/api/spots/getSpotByDistance', currentPosition);

        const updatedPlaces = response.data.slice(0, 20).map((place) => ({
          title: place.spot_name,
          main_section_1: '한식',
          main_section_2: '삼겹살',
          distance: '5',
          max_group_seats: '10',
          rating: 4.2,
          reviews: 93,
          price: '17,000',
          lat: place.spot_lat,
          lng: place.spot_lng,
          img: place.spot_main_img,
        }));

        setPlaces(updatedPlaces);

        console.log('places:', updatedPlaces);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };
    if (latitude && longitude) {
      fetchPlacesByDistance();
    }
  }, [latitude, longitude]);

  useEffect(() => {
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
      radius: 700,
      fillColor: '#CC3C28',
      fillOpacity: 0.05,
      strokeColor: 'transparent',
      strokeOpacity: 0,
      strokeWeight: 0,
    });

    window.naverMap = map;
  }, [latitude, longitude]);

  // 호버 액션을 처리하는 useEffect
  useEffect(() => {
    if (places.length > 0) {
      console.log('marker:', places);

      // 장소마다 마커 추가
      places.forEach((place) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(place.lat, place.lng),
          map: window.naverMap,
          title: place.title,
        });

        if (hoveredPlace === place) {
          const infoWindow = new window.naver.maps.InfoWindow({
            content: `<div style="padding: 5px;">${place.title}</div>`,
            position: new window.naver.maps.LatLng(place.lat, place.lng),
            map: window.naverMap,
            borderColor: '#2DB400',
            borderWidth: '2',
            anchorSkew: true,
          });
          infoWindow.open(window.naverMap, marker);
        }
        return marker;
      });
    }
  }, [places, hoveredPlace]);

  useEffect(() => {
    if (isFilterVisible) {
      document.body.style.overflow = 'hidden'; // 스크롤 비활성화
    } else {
      document.body.style.overflow = 'auto'; // 스크롤 활성화
    }
  }, [isFilterVisible]);

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

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const addFilter = (filter) => {
    setSelectedFilters([...selectedFilters, filter]);
  };

  const handleSelectFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const getFilterStyle = (filter) => ({
    height: 32,
    borderRadius: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 12px',
    border: '1px solid #d9d9d9',
    backgroundColor: selectedFilters.includes(filter) ? '#F44E3B' : 'transparent',
    borderColor: selectedFilters.includes(filter) ? '#F44E3B' : '#D9D9D9',
    color: selectedFilters.includes(filter) ? '#FFFFFF' : '#000000',
  });

  const handleMapClick = () => {
    if (isFilterVisible) {
      setIsFilterVisible(false);
    }
  };

  const filterContainerStyle = {
    position: 'absolute',
    top: 1,
    left: isFilterVisible ? 0 : '-100%',
    width: '33%',
    height: '88%',
    backgroundColor: 'white',
    zIndex: 1000,
    transition: 'left 0.3s ease-in-out',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
    overflowY: 'auto',
  };

  const filterList = ['동행인', '예산', '음식', '분위기', '시설·서비스'];

  const handleClickDetailFilter = (filter) => {
    setSelectedDetailFilter(filter);
  };

  const firstFilter = [
    '친한 사람과 함께',
    '동료와 함께',
    '상사와 함께',
    '임원과 함께',
    '거래처와 함께',
    '외국인과 함께',
  ];

  const secondFilter = [
    '한식',
    '중식',
    '일식',
    '양식',
    '아시안',
    '퓨전',
    '호프집',
    '이자카야',
    '브런치',
    '디저트·카페',
    '한정식',
    '파인다이닝',
    '패밀리레스토랑',
    '와인',
    '칵테일',
    '위스키',
    '전통주',
  ];

  const thirdFilter = ['조용한 담소', '활발한 수다', '시끌벅적한', '캐주얼한', '격식있는', '이국적·이색적'];

  const fourthFilter = [
    '개인룸',
    '단체석',
    '대관가능',
    '실내화장실',
    '주차가능',
    '발렛가능',
    '콜키지 무료',
    '콜키지 유료',
    '휠체어 이용가능',
    '플랜카드 부착 가능',
  ];

  const handleCardMouseEnter = (place) => {
    setHoveredPlace(place);
  };

  const handleCardMouseLeave = () => {
    setHoveredPlace(null);
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
              <Row gutter={[21, 21]}>
                {filterList.map((filter) => (
                  <Col key={filter}>
                    <Button
                      style={buttonStyle}
                      onClick={() => {
                        toggleFilter();
                        handleClickDetailFilter(filter);
                      }}
                    >
                      {filter} <DownOutlined />
                    </Button>
                  </Col>
                ))}
              </Row>
              {/* 세부 필터 애니메이션 스르륵 */}
              <div style={filterContainerStyle}>
                {/* 첫 번째 Col: 필터 카테고리 */}
                <Col
                  style={{
                    borderBottom: '1px solid #E0E0E0',
                    backgroundColor: 'white',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1200,
                  }}
                >
                  <Row justify="space-between" style={{ padding: '20px 5px 0 30px' }}>
                    {filterList.map((filter) => (
                      <Text
                        key={filter}
                        onClick={() => handleClickDetailFilter(filter)}
                        style={{
                          fontSize: '20px',
                          fontWeight: selectedDetailFilter === filter ? '800' : 'normal',
                          borderBottomWidth: selectedDetailFilter === filter ? 'medium' : 'normal',
                          borderBottomColor: selectedDetailFilter === filter ? '#CC3C28' : 'transparent',
                          borderBottomStyle: 'solid',
                          cursor: 'pointer',
                        }}
                      >
                        {filter}
                      </Text>
                    ))}
                    <Button
                      icon={<CloseOutlined />}
                      style={{ border: 'none', boxShadow: 'none', background: 'none' }}
                      onClick={() => toggleFilter()}
                    />
                  </Row>
                </Col>
                {/* 두 번째 Col: 선택 가능한 필터 값들 (스크롤 가능) */}
                <Col style={{ flex: 1, padding: '16px', marginLeft: '16px', marginRight: '16px' }}>
                  {/* 동행인 필터 */}
                  <Text strong>동행인</Text>
                  <Row
                    style={{
                      marginTop: '8px',
                      marginBottom: '32px',
                      gap: '8px',
                      borderBottom: '1px solid #E0E0E0',
                      paddingBottom: '32px',
                    }}
                  >
                    {firstFilter.map((filter) => (
                      <Button key={filter} onClick={() => handleSelectFilter(filter)} style={getFilterStyle(filter)}>
                        {filter}
                      </Button>
                    ))}
                  </Row>
                  {/* 예산 필터 */}
                  <Text strong>
                    1인당 예산
                    <span
                      style={{
                        fontSize: 12,
                        color: 'var(--0Gray-500, #737373)',
                        marginLeft: '10px',
                      }}
                    >
                      최소 - 최대
                    </span>
                  </Text>
                  <Row
                    style={{
                      marginTop: '8px',
                      marginBottom: '32px',
                      gap: '8px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <InputNumber
                      value={selectedRange[0]}
                      onChange={(value) => setSelectedRange([value, selectedRange[1]])}
                      min={0}
                      style={{ width: '140px' }}
                    />
                    <span>~</span>
                    <InputNumber
                      value={selectedRange[1]}
                      onChange={(value) => setSelectedRange([selectedRange[0], value])}
                      max={1000000}
                      style={{ width: '140px' }}
                    />
                  </Row>
                  <Slider
                    range
                    value={selectedRange}
                    onChange={(value) => setSelectedRange(value)}
                    min={10000}
                    max={400000}
                    step={10000}
                    style={{ borderBottom: '1px solid #E0E0E0', paddingBottom: '32px', marginBottom: '32px' }}
                  />
                  {/* 음식 필터 */}
                  <Text strong>음식 및 주류</Text>
                  <Row
                    style={{
                      marginTop: '8px',
                      marginBottom: '32px',
                      gap: '8px',
                      borderBottom: '1px solid #E0E0E0',
                      paddingBottom: '32px',
                    }}
                  >
                    {secondFilter.map((filter) => (
                      <Button key={filter} onClick={() => handleSelectFilter(filter)} style={getFilterStyle(filter)}>
                        {filter}
                      </Button>
                    ))}
                  </Row>
                  {/* 분위기 필터 */}
                  <Text strong>분위기</Text>
                  <Row
                    style={{
                      marginTop: '8px',
                      marginBottom: '32px',
                      gap: '8px',
                      borderBottom: '1px solid #E0E0E0',
                      paddingBottom: '32px',
                    }}
                  >
                    {thirdFilter.map((filter) => (
                      <Button key={filter} onClick={() => handleSelectFilter(filter)} style={getFilterStyle(filter)}>
                        {filter}
                      </Button>
                    ))}
                  </Row>
                  {/* 시설·서비스 필터 */}
                  <Text strong>시설·서비스</Text>
                  <Row
                    style={{
                      marginTop: '8px',
                      marginBottom: '32px',
                      gap: '8px',
                      // paddingBottom: '24px',
                      paddingBottom: '30px',
                    }}
                  >
                    {fourthFilter.map((filter) => (
                      <Button key={filter} onClick={() => handleSelectFilter(filter)} style={getFilterStyle(filter)}>
                        {filter}
                      </Button>
                    ))}
                  </Row>
                </Col>
                {/* 세 번째 Col: 취소 및 결과보기 버튼 */}
                <Col style={{ position: 'sticky', bottom: 0 }}>
                  <Row style={{ width: '100%' }}>
                    <Col span={8}>
                      <div
                        style={{
                          width: '100%',
                          backgroundColor: 'white',
                          borderRadius: 0,
                          borderTop: '1px solid #F44E3B',
                          fontWeight: '500',
                          textAlign: 'center',
                          lineHeight: '48px',
                          cursor: 'pointer',
                        }}
                        onClick={() => toggleFilter()}
                      >
                        취소
                      </div>
                    </Col>
                    <Col span={16}>
                      <div
                        style={{
                          width: '100%',
                          backgroundColor: '#F44E3B',
                          color: '#FFFFFF',
                          borderColor: '#F44E3B',
                          borderRadius: 0,
                          border: '1px solid #F44E3B',
                          textAlign: 'center',
                          lineHeight: '48px',
                          cursor: 'pointer',
                        }}
                        onClick={() => toggleFilter()}
                      >
                        결과보기
                      </div>
                    </Col>
                  </Row>
                </Col>
              </div>
              {/* 가변 줄: 세부 필터에서 선택한 옵션 표시 */}
              <Row style={{ margin: '10px 0' }}>
                {selectedFilters.map((filter, index) => (
                  <Tag key={index} color="red" closable onClose={() => addFilter(filter)}>
                    {filter}
                  </Tag>
                ))}
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
                        <Text style={{ color: '#000000', fontSize: '17px' }}>거리순</Text>
                      </Button>
                    </Col>
                    <Text style={{ marginTop: '4px' }}>|</Text>
                    <Col>
                      <Button style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
                        <Text style={{ color: '#B3B3B3', fontSize: '17px' }}>리뷰순</Text>
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
            dataSource={places.slice(0, 20)}
            renderItem={(place) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
                <Card
                  hoverable
                  style={{
                    borderRadius: '8px',
                    border: '1px solid var(--0Gray-300, #D4D4D4)',
                    // boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.12)',
                    boxShadow:
                      hoveredPlace === place ? '0px 0px 12px rgba(0, 0, 0, 0.3)' : '0px 0px 4px rgba(0, 0, 0, 0.12)',
                    transform: hoveredPlace === place ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    marginBottom: 24,
                  }}
                  onMouseEnter={() => handleCardMouseEnter(place)}
                  onMouseLeave={handleCardMouseLeave}
                  bordered={false}
                  bodyStyle={{ padding: 12 }}
                >
                  <Row gutter={16} align="middle">
                    {/* 왼쪽 텍스트 및 태그 */}
                    <Col span={16}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <Title
                            level={4}
                            style={{
                              margin: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '190px',
                            }}
                          >
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
                        src={place.img || '/default-image.jpg'}
                        fallback="/default.png"
                        preview={false}
                        bordered={false}
                        style={{
                          width: '130px',
                          height: '130px',
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
        <div style={{ width: '67%', height: '100%' }} onClick={handleMapClick}>
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
